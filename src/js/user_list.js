async function listUser() {

    const user_list = await window.contract.methods.getAllUser().call();

    const user_address = user_list['usersAddress'];
    const user_name = user_list['userNames'];
    const user_email = user_list['userEmails'];
    elm = `
    <tr>
                <td>Index No.</td>
                <td>User Address</td>
                <td>Username</td>
                <td>User Email</td>
                <td>Registered</td>
            </tr>`;

    for (let i = user_address.length - 1; i >= 0; i--) {

        elm += `
            <tr>
                <td>${i}</td>
                <td>${user_address[i]}</td>
                <td>${user_name[i]}</td>
                <td>${user_email[i]}</td>
                <td>Yes</td>
            </tr>
        `;
    }
    document.getElementById('block').querySelector('table').innerHTML = elm;
}



