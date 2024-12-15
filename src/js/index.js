async function userLogin() {

    _address = document.getElementById('address').value;
    _password = document.getElementById('password').value;

    address = await window.contract.methods.userChecker(_address).call();
    password = await window.contract.methods.userPasswordChecker(_address, _password).call();

    if ((_address === "") || (_password === "")) {
        alert('Please fill all field ！！');
    }
    else if (!address) {
        alert("The User not exist");
    }else if (!password) {
        alert("The Pasword is wrong!!!");
    }  else {

        document.location.href = 'election.html';
        console.log('user '+ _address + ' login successfully.');
    }
}






