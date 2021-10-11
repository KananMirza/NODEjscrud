const DB = require("../DB/connection");
const moment = require("moment");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.GenerateToken = async function(result){
  const LoginUser = result;
  const token = await jwt.sign({_id:LoginUser[0].id,email:LoginUser[0].email},"ayy@qaa",{});
  return token;
};


const isciGetir = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM employees`;
    const filter = [];

    DB.query(query, filter, async (err, result, fields) => {
      if (err) {
        resolve(err);
        return 0;
      }
      if (result === undefined || !result || result.length === 0) {
        resolve(0);
        return 0;
      }
      resolve(result);
      return 1;
    });
  });
};

const mailGetir = async (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM employees where email=?`;
    const filter = [email];

    DB.query(query, filter, async (err, result, fields) => {
      if (err) {
        resolve(err);
        return 0;
      }
      if (result === undefined || !result || result.length === 0) {
        resolve(0);
        return 0;
      }
      resolve(result);
      return 1;
    });
  });
};

const login = async (email,password) => {
  return new Promise( async (resolve, reject) => {
    const user = await mailGetir(email);
    let current_pass;
    if(user[0].email){
      current_pass = user[0].password;
    }
    console.log(user[0].email);
    const check_pass = await bcrypt.compare(password,current_pass);
    console.log(check_pass);
    if(check_pass){
      const token = await this.GenerateToken(user);
      resolve(token)
      return 1;
    }else{
      reject("NOT FOUND")
      return 0;
    }
  });
};

const isciSil = async (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM employees where id = ? `;
    const filter = [id];

    DB.query(query, filter, async (err, result, fields) => {
      if (err) {
        resolve(err);
        return 0;
      }
      console.log(result.affectedRows);
      if (result.affectedRows == 0) {
        resolve(0);
        return 0;
      }
      resolve(1);
      return 1;
    });
  });
};

const isciElaveEt = async (namelastname, position, salary, family, email) => {
  return new Promise( async(resolve, reject) => {
    const query = `INSERT INTO employees(namelastname,position,salary,family,email,date,ref_code,password) VALUES (?,?,?,?,?,?,?,?)`;
    const date = await moment().local().format("YYYY-MM-DD HH:MM:SS");
    const refCode = await makeRefCode();
    const randomPassword = await makePassword();
    console.log(randomPassword);
    const pass = await bcrypt.hash(randomPassword,10);
    console.log(pass)
    const filter = [namelastname, position, salary, family, email, date,refCode,pass];

    DB.query(query, filter, async (err, result, fields) => {
      if (err) {
        resolve(err);
        return 0;
      }
      if (result === undefined || !result || result.length === 0) {
        resolve(0);
        return 0;
      }
      resolve(1);
      return 1;
    });
  });
};

const isciRedakteEt = async (id, namelastname, position, salary, family) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE employees SET namelastname = ?, position = ?, salary = ?, family = ? WHERE id = ?`;
    const filter = [namelastname, position, salary, family, id];

    DB.query(query, filter, async (err, result, fields) => {
      if (err) {
        resolve(err);
        return 0;
      }
      if (result === undefined || !result || result.length === 0) {
        resolve(0);
        return 0;
      }
      resolve(1);
      return 1;
    });
  });
};

const makeRefCode = async() => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const check = await checkrefCode(result);
  if(check){
    makeRefCode();
  }
  return result;
};

const makePassword = async() => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!_@#$!_@#$!_";
  var charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const check = await checkrefCode(result);
  if(check){
    makeRefCode();
  }
  return result;
};

const checkrefCode = (code) =>{
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM employees where ref_code = ?`;
    const filter = [code];

    DB.query(query, filter, async (err, result, fields) => {
      if (err) {
        resolve(err);
        return 0;
      }
      if (result === undefined || !result || result.length === 0) {
        resolve(0);
        return 0;
      }
      resolve(1);
      return 1;
    });
  });
}

module.exports = {
  isciGetir,
  mailGetir,
  isciSil,
  isciElaveEt,
  isciRedakteEt,
  login,
};
