async function userSignUp() {
    _address = document.getElementById('address').value;
    _name = document.getElementById('name').value;
    _email = document.getElementById('email').value;
    _password = document.getElementById('password').value;
    _confirm_password = document.getElementById('confirm_password').value;

    const is_registered1 = await window.contract.methods.userChecker(_address).call();
    const is_registered2 = await window.contract.methods.userEmailChecker(_address, _email).call();

    if (is_registered1) {
        alert("The User is already reqistered!!!");
    }
    else if(is_registered2){
        alert("The Email is already reqistered!!!");
    }
    else if(_password != _confirm_password){
        alert("The New Password and Confimation Password not match!!!");
    }
    else {
        console.log('Address '+ account+ ' registered as an User successfully.');
        if (!(_address === "") && !(_name === "")&& !(_email === "")&& !(_password === "")&& !(_confirm_password === "") ) {

            await window.contract.methods.userSignUp(_address, _name, _email, _password).send({ from: account });
            alert('Address '+ account+ ' registered as an User successfully.');
        }
    }
}