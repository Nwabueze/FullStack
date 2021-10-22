require('dotenv').config();

const KEY1 = process.env.MAILJET_KEY1;
const KEY2 = process.env.MAILJET_KEY2;
const mailjet = require ('node-mailjet').connect(KEY1, KEY2);

// Sends email verifiaction link
const mailer = async (reciever, link, name, mailID) => {
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "adielesamuel@gmail.com",
            "Name": "Samuel"
          },
          "To": [
            {
              "Email": reciever,
              "Name": "Samuel"
            }
          ],
          "Subject": "Verify Your Email Address",
          "TextPart": `Click ${link} to verify your email address`,
          "HTMLPart": `<h3>Thank you ${name}, you are almost there.
          <br />
          <span>Click the following link to verify your email address and activate your account
          <a href='${link}'>${link}</a></h3><br /> May the good force be with you!
          <br /> <span> Link will expire in 15 minutes</span>`,
          "CustomID": mailID
        }
      ]
    })
    request
      .then((result) => {
        //console.log(result.body);
        return true;
      })
      .catch((err) => {
        console.log(err.statusCode);
        return false;
      });
}

/**
 * 
 * @param {string} reciever the address message is to be sent
 * @param {string} link the page that verifies the email
 * @param {string} mailID any random ID
 */
const resetLink = async (reciever, link, mailID) => {
  const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "adielesamuel@gmail.com",
          "Name": "Samuel"
        },
        "To": [
          {
            "Email": reciever,
            "Name": ""
          }
        ],
        "Subject": "Password Reset",
        "TextPart": `Click ${link} to reset your password`,
        "HTMLPart": `<h3>Password reset link
        <br />
        <span>Click the following link to reset your password
        <a href='${link}'>${link}</a>!</h3><br /> May the good force be with you!
        <br /> <span> Link will expire in 15 minutes</span>`,
        "CustomID": mailID
      }
    ]
  })
  request
    .then((result) => {
      console.log(result.body);
      return true;
    })
    .catch((err) => {
      console.log(err.statusCode);
      return false;
    });
};

/**
 * 
 * @param {number} min Minimum number inclusive
 * @param {number} max Maximum number exclusive
 * @returns number
 */
const  RandomNumber =  (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

/**
 * 
 * @returns a four digit number
 */
const PIN4digits = () => {
  let arr = '0123456789'.split('');
  const a = RandomNumber(0, 9);
  const b = RandomNumber(0, 9);
  const c = RandomNumber(0, 9);
  const d = RandomNumber(0, 9);
  
  if(a == b && a == c && a == d){
      return PIN4digits();
  }
  
  return arr[a]+""+arr[b]+""+arr[c]+""+arr[d];
};

module.exports = { mailer, resetLink, PIN4digits, RandomNumber };
