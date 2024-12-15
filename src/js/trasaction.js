
function shortAddress(_address) {
    let short = _address.substring(0, 9) + '...' + _address.substring(_address.length - 4);
    return short;
}

async function loadVotingTransaction() {
    const events = await window.contract.getPastEvents('userVoting', {
        fromBlock: 0,
        toBlock: 'latest'
    });

    display1(events);
}

function display1(events) {
    elm = `
            <tr>
                <td>Transaction Hash</td>
                <td>Block</td>
                <td>Event</td>
                <td>Voter Address</td>
                <td>Candidate Address</td>
                <td>Election</td>
            </tr>`;

    for (let i = events.length - 1; i >= 0; i--) {

        trx_hash = shortAddress(events[i].transactionHash);
        voter_address = shortAddress(events[i].returnValues.userAddresses);
        can_address = shortAddress(events[i].returnValues.canAddresses);
        console.log(events[i].ProductPurchased);
        elm += `
            <tr>
                <td>${trx_hash}</a></td>
                <td>${events[i].blockNumber}</td>
                <td>${events[i].event}</td>
                <td>${voter_address}</td>
                <td>${can_address}</td>
                <td>${events[i].returnValues.election}</td>
            </tr>
        `;
    }
    document.getElementById('votingTransaction').querySelector('table').innerHTML = elm; 
}

async function loadProfileTransaction() {
    const events = await window.contract.getPastEvents('candidateProfile', {
        fromBlock: 0,
        toBlock: 'latest'
    });

    display2(events);
}

function display2(events) {
    elm = `<tr>
                <td>Transaction Hash</td>
                <td>Block</td>
                <td>Event</td>
                <td>Candidate Address</td>
                <td>Election</td>
                <td>Candidate Name</td>
                <td>Candidate Age</td>
                <td>Candidate Desciption</td>
            </tr>`;

    for (let i = events.length - 1; i >= 0; i--) {
       
        trx_hash = shortAddress(events[i].transactionHash);
        can_address = shortAddress(events[i].returnValues.canAddresses);
        console.log(events[i].candidateProfile);
        elm += `
            <tr>
                <td>${trx_hash}</a></td>
                <td>${events[i].blockNumber}</td>
                <td>${events[i].event}</td>
                <td>${can_address}</td>
                <td>${events[i].returnValues.election}</td>
                <td>${events[i].returnValues.name}</td>
                <td>${events[i].returnValues.age}</td>
                <td>${events[i].returnValues.desc}</td>
            </tr>
        `;
    }
    document.getElementById('profileTransaction').querySelector('table').innerHTML = elm;  
}

async function loadElectionTransaction() {
    const events = await window.contract.getPastEvents('electionCreated', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    const events2 = await window.contract.getPastEvents('electionModify', {
        fromBlock: 0,
        toBlock: 'latest'
    });

    display3(events,events2);
}

function display3(events, events2) {
    elm = `<tr>
                <td>Transaction Hash</td>
                <td>Block</td>
                <td>Event</td>
                <td>Election</td>
                <td>Election Name</td>
                <td>Election Deadline</td>
                <td>Election Date</td>
                <td>Election Desciption</td>
            </tr>`;

    for (let i = events.length - 1; i >= 0; i--) {
       
        trx_hash = shortAddress(events[i].transactionHash);
        elm += `
            <tr>
                <td>${trx_hash}</a></td>
                <td>${events[i].blockNumber}</td>
                <td>${events[i].event}</td>
                <td>${events[i].returnValues.election}</td>
                <td>${events[i].returnValues.name}</td>
                <td>${events[i].returnValues.deadline}</td>
                <td>${events[i].returnValues.electionDate}</td>
                <td>${events[i].returnValues.electionDesc}</td>
            </tr>
        `;
    }
    for (let i = events2.length - 1; i >= 0; i--) {
       
        trx_hash = shortAddress(events2[i].transactionHash);
        elm += `
            <tr>
                <td>${trx_hash}</a></td>
                <td>${events2[i].blockNumber}</td>
                <td>${events2[i].event}</td>
                <td>${events[i].returnValues.election}</td>
                <td>${events[i].returnValues.deadline}</td>
                <td>${events[i].returnValues.name}</td>
                <td>${events[i].returnValues.electionDate}</td>
                <td>${events[i].returnValues.electionDesc}</td>
            </tr>
        `;
    }

    

    document.getElementById('electionTransaction').querySelector('table').innerHTML = elm; 
}


async function loadElectionStatusTransaction() {
    const events = await window.contract.getPastEvents('electionStarted', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    const events2 = await window.contract.getPastEvents('electionEnded', {
        fromBlock: 0,
        toBlock: 'latest'
    });

    display4(events,events2);
}

function display4(events, events2) {
    elm = `<tr>
                <td>Transaction Hash</td>
                <td>Block</td>
                <td>Event</td>
                <td>Election</td>
                <td>Election Status</td>
            </tr>`;

    for (let i = events.length - 1; i >= 0; i--) {
       
        trx_hash = shortAddress(events[i].transactionHash);
        elm += `
            <tr>
                <td>${trx_hash}</a></td>
                <td>${events[i].blockNumber}</td>
                <td>${events[i].event}</td>
                <td>${events[i].returnValues.election}</td>
                <td>${events[i].returnValues.status}</td>
            </tr>
        `;
    }
    for (let i = events2.length - 1; i >= 0; i--) {
       
        trx_hash = shortAddress(events2[i].transactionHash);
        elm += `
            <tr>
                <td>${trx_hash}</a></td>
                <td>${events2[i].blockNumber}</td>
                <td>${events2[i].event}</td>
                <td>${events[i].returnValues.election}</td>
                <td>${events[i].returnValues.status}</td>
            </tr>
        `;
    }


    document.getElementById('electionStatusTransaction').querySelector('table').innerHTML = elm;   

}

async function loadRequestTransaction() {
    const events = await window.contract.getPastEvents('requestSent', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    display5(events);
}

function display5(events) {
    elm = `<tr>
                <td>Transaction Hash</td>
                <td>Block</td>
                <td>Event</td>
                <td>Address</td>
                <td>Request</td>
                <td>Role</td>
            </tr>`;

    for (let i = events.length - 1; i >= 0; i--) {
       
        trx_hash = shortAddress(events[i].transactionHash);
        user_address = shortAddress(events[i].returnValues.userAddresses);
        elm += `
            <tr>
                <td>${trx_hash}</a></td>
                <td>${events[i].blockNumber}</td>
                <td>${events[i].event}</td>
                <td>${user_address}</td>
                <td>${events[i].returnValues.election}</td>
                <td>${events[i].returnValues.role}</td>
            </tr>
        `;
    }


    document.getElementById('requestTransaction').querySelector('table').innerHTML = elm;

}

async function loadSignUpTransaction() {
    const events = await window.contract.getPastEvents('userRegister', {
        fromBlock: 0,
        toBlock: 'latest'
    });


    display6(events);
}

function display6(events) {
    elm = `<tr>
                <td>Transaction Hash</td>
                <td>Block</td>
                <td>Event</td>
                <td>User Address</td>
                <td>User Name</td>
                <td>User Email</td>
                <td>User Password</td>
            </tr>`;

    for (let i = events.length - 1; i >= 0; i--) {
       
        trx_hash = shortAddress(events[i].transactionHash);
        user_address = shortAddress(events[i].returnValues.userAddresses);
        elm += `
            <tr>
                <td>${trx_hash}</a></td>
                <td>${events[i].blockNumber}</td>
                <td>${events[i].event}</td>
                <td>${user_address}</td>
                <td>${events[i].returnValues.name}</td>
                <td>${events[i].returnValues.email}</td>
                <td>${events[i].returnValues.password}</td>
            </tr>
        `;
    }


    document.getElementById('signUpTransaction').querySelector('table').innerHTML = elm;

}

async function loadResetTransaction() {
    const events = await window.contract.getPastEvents('userReset', {
        fromBlock: 0,
        toBlock: 'latest'
    });

    display7(events);
}

function display7(events) {
    elm = `<tr>
                <td>Transaction Hash</td>
                <td>Block</td>
                <td>Event</td>
                <td>User Address</td>
                <td>User New Password</td>
            </tr>`;

    for (let i = events.length - 1; i >= 0; i--) {
       
        trx_hash = shortAddress(events[i].transactionHash);
        user_address = shortAddress(events[i].returnValues.userAddresses);
        elm += `
            <tr>
                <td>${trx_hash}</a></td>
                <td>${events[i].blockNumber}</td>
                <td>${events[i].event}</td>
                <td>${user_address}</td>
                <td>${events[i].returnValues.password}</td>
            </tr>
        `;
    }

    document.getElementById('resetTransaction').querySelector('table').innerHTML = elm;   

}

