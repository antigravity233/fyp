async function adminResetPassword() {
    _old_password= document.getElementById('old_password').value;
    _new_password = document.getElementById('new_password').value;
    _confirm_password = document.getElementById('confirm_password').value;

    matchUp = await window.contract.methods.adminPasswordChecker(account, _old_password).call();

    if (!matchUp) {
        alert("The Old Password is invalid!!!");
    }
    else if(_new_password != _confirm_password){
        alert("The New Password and Confimation Password not match!!!");
    }
    else {
        console.log('Admin '+ account+ ' reset password successfully.');
        if (!(_old_password === "")&& !(_new_password === "")&& !(_confirm_password === "") ) {

            await window.contract.methods.resetAdminPassword(_new_password, account).send({ from: account });

            
            alert('Admin '+ account+ ' reset password successfully.');
        }
    }
}