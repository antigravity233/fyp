async function adminLogin() {
    _address = document.getElementById('address').value;
    _password = document.getElementById('password').value;


    address = await window.contract.methods.adminChecker(_address).call();
    password = await window.contract.methods.adminPasswordChecker(_address, _password).call();

    if ((_address === "") || (_password === "")) {
        alert('Please fill all field ！！');
    }
    else if (!address) {
        alert("The Admin not exist");
    }else if (!password) {
        alert("The Pasword not wrong!!!");
    }  else {
        document.location.href = 'dashboard.html';
        console.log('Admin '+ _address + ' login successfully.');
    }

}