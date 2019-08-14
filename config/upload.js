const qiniu = require("qiniu");
const fs = require("fs");
const path = require("path");
const cdnConfig = require("../app.config.js").cdn;
const { ak, sk, bucket } = cdnConfig;

const mac = new qiniu.auth.digest.Mac(ak, sk);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
const exclud = ["index.html"];
const doUpload = (key, file, a) => {
  let options;
  if (a) {
    options = {
      scope: bucket + key + ":" + key
    };
  } else {
    options = {
      scope: bucket + ":" + key
    };
  }

  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploaderToken = putPolicy.uploadToken(mac);
  return new Promise((resolve, reject) => {
    formUploader.putFile(
      uploaderToken,
      key,
      file,
      putExtra,
      (err, body, info) => {
        if (err) {
          return reject(err);
        }
        if (info.statusCode === 200) {
          resolve(body);
        } else {
          reject(info);
        }
      }
    );
  });
};

const files = fs.readdirSync(path.join(__dirname, "../build"));

let uploads = files.map(file => {
  if (file === "static") {
    return Promise.resolve();
  }
  if (exclud.indexOf(file) === -1) {
    return doUpload(file, path.join(__dirname, "../build", file));
  } else {
  }
});
const files2 = fs.readdirSync(path.join(__dirname, "../build/static/"));

files2.map(file => {
  const fileItems = fs.readdirSync(
    path.join(__dirname, "../build/static", file)
  );
  let upload = fileItems.map(item => {
    return doUpload(
      "static/" + file + "/" + item,
      path.join(__dirname, "../build/static/" + file, item)
    );
  });
  uploads = [...uploads, upload];
});

Promise.all(uploads)
  .then(res => {
    console.log("upload success", res);
  })
  .catch(errs => {
    console.log("upload fail", errs);
    process.exit(0);
  });
