import nodemailer from 'nodemailer';
import config from 'server/config';

const transporter = nodemailer.createTransport({
    service: config.transporter.service,
    host: config.transporter.host,
    port: config.transporter.port,
    auth: {
        user: config.transporter.email,
        pass: config.transporter.password
    }
});

export default transporter;
