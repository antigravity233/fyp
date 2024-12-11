

async function sentEmail() {
    const _address = document.getElementById('address').value;
    const _email = document.getElementById('email').value;

    const address = await window.contract.methods.userChecker(_address).call();
    const email = await window.contract.methods.userEmailChecker(_address, _email).call();

    let new_password = generatePass();

   if (address && email) {
        await window.contract.methods.resetUserPassword(new_password).send({ from: account });


            let emailData = {
                address: _address,
                email: _email,
                subject: 'Resetting Your Password',
                message: new_password
            }

            console.log(emailData);

            let post = new XMLHttpRequest();
            post.open('POST', '/login_forgot.html');
            post.setRequestHeader('Content-Type', 'application/json');
            post.onload = function(){
                console.log(post.responseText);
                if(post.responseText == 'success'){
                    alert('Email sent');
                    address.value = '';
                    email.value = '';
                    subject.value = '';
                    message.value = '';
                }else{
                    alert('Email failed');
                }
            }
            
            let sentData = JSON.stringify(emailData);

            post.send(sentData);
   }
    else if (!email) {
        alert("The Email is wrong!!!");
    } else {
        alert("The User is not reqistered!!!");
    }
}



function generatePass() {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }

    return pass;
}

