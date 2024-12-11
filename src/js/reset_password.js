async function userResetPassword() {
    _old_password= document.getElementById('old_password').value;
    _new_password = document.getElementById('new_password').value;
    _confirm_password = document.getElementById('confirm_password').value;

    const matchUp = await window.contract.methods.userPasswordChecker(account, _old_password).call();

    if (!matchUp) {
        alert("The Old Password is invalid!!!");
    }
    else if(_new_password != _confirm_password){
        alert("The New Password and Confimation Password not match!!!");
    }
    else {
        console.log('User '+ account+ ' reset password successfully.');
        if (!(_old_password === "")&& !(_new_password === "")&& !(_confirm_password === "") ) {

            await window.contract.methods.resetUserPassword(_new_password).send({ from: account });
            alert('User '+ account+ ' reset password successfully.');
        }
    }
}