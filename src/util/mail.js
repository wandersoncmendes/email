

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);
console.log(process.env.CLIENT_ID)

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const sendMail = async () => {

    const tokens = await oauth2Client.refreshAccessToken()    
    const accessToken = tokens.credentials.access_token


    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "wmendes99@gmail.com",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    });


    const mailOptions = {
        from: "wmendes99@gmail.com",
        to: "wmendes99@hotmail.com",
        subject: "Node.js Email with Secure OAuth",
        generateTextFromHTML: true,
        html: "<b>test</b>"
    };


    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
}


module.exports = sendMail;