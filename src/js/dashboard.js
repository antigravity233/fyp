async function listRequest() {

    const request_list = await window.contract.methods.getAllRequest().call();

    const request_ID = request_list['requestID'];
    const user_address = request_list['addresses'];
    const election_ID = request_list['electionID'];
    const role = request_list['role'];
    elm = `
    <tr>
                <td>Request ID</td>
                <td>User Address</td>
                <td>Election ID</td>
                <td>Role</td>
                <td>Validate</td>
                <td>Decilne</td>
            </tr>`;

    for (let i = 0; i <= request_ID.length - 1; i++) {

        elm += `
            <tr>
                <td>${request_ID[i]}</td>
                <td>${user_address[i]}</td>
                <td>${election_ID[i]}</td>
                <td>${role[i]}</td>
                <td>
                <input type="button" class="valid-btn" value="Validate"
                onclick="validateUser('${user_address[i]}','${election_ID[i]}', '${request_ID[i]}', '${role[i]}')" />
                </td >
            <td><input type="button" class="dec-btn" value="Decline" onclick="removeRequest('${request_ID[i]}')" /></td>
            </tr >
            `;
    }
    document.getElementById('dashboard').querySelector('table').innerHTML = elm;
}

async function validateUser(address, electionID, requestID, role) {
    if (role == "Voter") {
        validateVoter(address, electionID, requestID);
    }
    else {
        validateCandidate(address, electionID, requestID);
    }
}



async function validateVoter(address, electionID, requestID) {
    await window.contract.methods.validateVoter(address, electionID, requestID).send({ from: account });
    location.reload();
}

async function validateCandidate(address, electionID, requestID) {
    await window.contract.methods.validateCandidate(address, electionID, requestID).send({ from: account });
    location.reload();
}

async function removeRequest(requestID) {
    await window.contract.methods.removeRequest(requestID, ).send({ from: account });
    location.reload();
}

