async function userLogin() {

    _address = document.getElementById('address').value;
    _password = document.getElementById('password').value;

    const address = await window.contract.methods.userChecker(_address).call();
    const password = await window.contract.methods.userPasswordChecker(_address, _password).call();

    if ((_address === "") || (_password === "")) {
        alert('Please fill all field ！！');
    }
    else if (!address) {
        alert("The User not exist");
    }else if (!password) {
        alert("The Pasword not wrong!!!");
    }  else {

        let userData = {
            address: _address,
        }

        console.log(userData);

            let post = new XMLHttpRequest();
            post.open('POST', '/login');
            post.setRequestHeader('Content-Type', 'application/json');
            post.onload = function(){
                console.log(post.responseText);
                if(post.responseText == 'success'){
                    alert('User sent');
                    address.value = '';
                }else{
                    alert('Login failed');
                }
            }
            
            let sentData = JSON.stringify(userData);
            post.send(sentData);

        document.location.href = 'election.html';
        console.log('user '+ _address + ' login successfully.');
    }
}






