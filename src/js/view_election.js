async function viewElection() {
    const url = window.location.search;
    const url_params = new URLSearchParams(url);
    const _electionName = url_params.get('_name');

    const _election_list = await window.contract.methods.getAllElection().call();
    const _election_ID = _election_list['ids'];
    const _election_name = _election_list['names'];
    const _election_dead = _election_list['deadline'];
    const _election_date = _election_list['date'];
    const _election_desc = _election_list['desc'];
    const _election_status = _election_list['status'];

    for (i = 0; i <= _election_name.length; i++) {
        if (_electionName == _election_name[i]) {
            election_id = _election_ID[i];
            election_Name = _election_name[i];
            election_deadline = _election_dead[i];
            election_date = _election_date[i];
            election_desc = _election_desc[i];
            election_status = _election_status[i];

        }
    }

    document.getElementById('electionName').innerHTML = election_Name;

    let elm = `
            <p class="title">Register deadline: </p>
            <p class="detail" id="deadline">${election_deadline}</p>
            <p class="title">Election Date: </p>
            <p class="detail" id="date">${election_date}</p>
            <p class="title">Status:</p>
            <p class="detail" id="status">${election_status}</p>
            <p class="title">Description:</p>
            <p class="detail" id="desc">${election_desc}</p>
            <p id="candidate">Candidate List</p>
            <div id="candidate_list"></div>`;

    document.getElementById('election_detail').innerHTML = elm;

}

async function candidateList() {
    const url = window.location.search;
    const url_params = new URLSearchParams(url);
    const _electionName = url_params.get('_name');

    const _election_list = await window.contract.methods.getAllElection().call();
    const _election_ID = _election_list['ids'];
    const _election_name = _election_list['names'];


    for (i = 0; i <= _election_name.length; i++) {
        if (_electionName == _election_name[i]) {
            election_id = _election_ID[i];
        }
    }

    const _candidate_list = await window.contract.methods.getAllCandidate(election_id).call();
    const _candidate_name = _candidate_list['candidateName'];
    const _candidate_age = _candidate_list['candidateAge'];
    const _candidate_vote = _candidate_list['candidateVote'];
    const _candidate_desc = _candidate_list['candidateDesc'];

    elm = '';

    for (i = 0; i <= _candidate_name.length -1; i++) {
     elm += `
            <div id="candidate_detail">
                <img src="./img/profile.png" id="can_img">
                <p class="title">Name: </p>
                <p class="detail" id="name">${_candidate_name[i]}</p>
                <p class="title">Age: </p>
                <p class="detail" id="age">${_candidate_age[i]}</p>
                <p class="title">Vote:</p>
                <p class="detail" id="vote">${_candidate_vote[i]}</p>
                <p class="title">Description:</p>
                <p class="detail" id="desc">${_candidate_desc[i]}</p>
            </div>
            `;
    }
    document.getElementById('candidate_list').innerHTML = elm;

}



async function startElection() {
    const url = window.location.search;
    const url_params = new URLSearchParams(url);
    const _electionName = url_params.get('_name');

    const _election_list = await window.contract.methods.getAllElection().call();
    const _election_ID = _election_list['ids'];
    const _election_name = _election_list['names'];


    for (i = 0; i <= _election_name.length; i++) {
        if (_electionName == _election_name[i]) {
            election_id = _election_ID[i];
        }
    }

   await window.contract.methods.startElection(election_id).send({ from: account });
}

async function endElection() {
    const url = window.location.search;
    const url_params = new URLSearchParams(url);
    const _electionName = url_params.get('_name');

    const _election_list = await window.contract.methods.getAllElection().call();
    const _election_ID = _election_list['ids'];
    const _election_name = _election_list['names'];


    for (i = 0; i <= _election_name.length; i++) {
        if (_electionName == _election_name[i]) {
            election_id = _election_ID[i];
        }
    }

   await window.contract.methods.endElection(election_id).send({ from: account });
}
