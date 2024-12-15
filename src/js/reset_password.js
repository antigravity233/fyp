async function userResetPassword() {
    _old_password= document.getElementById('old_password').value;
    _new_password = document.getElementById('new_password').value;
    _confirm_password = document.getElementById('confirm_password').value;

    const matchUp = await window.contract.methods.userPasswordChecker(account, _old_password).call();

    let isValid = validPassword(_new_password);

    if (!matchUp) {
        alert("The Old Password is invalid!!!");
    }
    else if(_new_password != _confirm_password){
        alert("The New Password and Confimation Password not match!!!");
    }
    else {
        console.log('User '+ account+ ' reset password successfully.');
        if (!(_old_password === "")&& !(_new_password === "")&& !(_confirm_password === "") && isValid) {

            await window.contract.methods.resetUserPassword(_new_password).send({ from: account });
            alert('User '+ account+ ' reset password successfully.');
        }
    }
}


function validPassword(password){
    if(!/[^a-zA-Z0-9]/.test(password)){
        alert('Must contain at least one number, one uppercase and lowercase letter');
        return false;
    }
    else if(password.length < 8){
        alert('Must at least 8 characters ');
        return false;
    }
    else{
        return true;
    }
}
