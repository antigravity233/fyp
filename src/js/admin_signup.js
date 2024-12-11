async function adminSignUp() {
    _address = document.getElementById('address').value;
    _name = document.getElementById('name').value;
    _email = document.getElementById('email').value;
    _password = document.getElementById('password').value;
    _confirm_password = document.getElementById('confirm_password').value;

    is_registered1 = await window.contract.methods.adminChecker(_address).call();
    is_registered2 = await window.contract.methods.adminEmailChecker(_address, _email).call();

    if (is_registered1) {
        alert("The Admin is already reqistered!!!");
    }
    else if (is_registered2) {
        alert("The Email is already reqistered!!!");
    }
    else if (_password != _confirm_password) {
        alert("The New Password and Confimation Password not match!!!");
    }
    else {
        console.log('Address ' + account + ' registered as an Admin successfully.');
        if (!(_address === "") && !(_name === "") && !(_email === "") && !(_password === "") && !(_confirm_password === "")) {

            await window.contract.methods.adminSignUp(_address, _name, _email, _password).send({ from: account });
            alert('Address ' + account + ' registered as an Admin successfully.');
        }
    }
}