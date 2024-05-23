const otpGenerator = (otp) => {
    var otp = 0;
    otp = Math.ceil(Math.random() * 100000)
    return otp
}
export default otpGenerator