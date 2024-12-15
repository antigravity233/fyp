async function listElection() {
    election_list = await window.contract.methods.getAllElection().call();
    election_id = election_list['ids'];
    election_name = election_list['names'];
    election_deadline = election_list['deadline'];
    election_date = election_list['date'];
    election_decs = election_list['desc'];

    elm = '';

    for (let i = 0; i < election_name.length; i++) {

        isWait = await window.contract.methods.electionWaitChecker(election_id[i]).call();
        
        if(isWait){
        elm += `  
        <div class="election e${i + 1}">
                <div class="election-detail">
                    <p class="election-name">${election_name[i]}<br /></p>
                    <p class="election-dead">Register Deadline: ${election_deadline[i]}<br /></p>
                    <p class="election-date">ElectionDate: ${election_date[i]}</p>  
                </div>
        <p class="election-des">${election_decs[i]}</p>
        <input type="button" class="can-btn" value="Become Candidate" onclick = "candidateRequest('${election_id[i]}')"/>
        <input type="button" class="voter-btn" value="Become Voter" onclick = "voterRequest('${election_id[i]}')"/>
        </div>`;
        }
    }

    document.getElementById('election-list').innerHTML = elm;

}

async function listCandidateElection() {
    election_list = await window.contract.methods.getAllElection().call();
    election_id = election_list['ids'];
    election_name = election_list['names'];
    election_deadline = election_list['deadline'];
    election_date = election_list['date'];
    election_decs = election_list['desc'];
 

    elm = '';

    for (let i = 0; i < election_id.length; i++) {
        isWait = await window.contract.methods.electionWaitChecker(election_id[i]).call();
        
        if(isWait){
        elm += `  
            <div class="election e${i + 1}">
                <div class="election-detail">
                    <p class="election-name">${election_name[i]}<br /></p>
                    <p class="election-dead">Register Deadline: ${election_deadline[i]}<br /></p>
                    <p class="election-date">ElectionDate: ${election_date[i]}</p>  
                </div>
            <p class="election-des">${election_decs[i]}</p>
            <a href="candidate_profile.html?_name=${election_name[i]}" class="can-btn">Edit Candidate</a>
            </div>`;
        }
    }

    document.getElementById('election-list-can').innerHTML = elm;

}

async function listVoterElection() {
    election_list = await window.contract.methods.getAllElection().call();
    election_id = election_list['ids'];
    election_name = election_list['names'];
    election_deadline = election_list['deadline'];
    election_date = election_list['date'];
    election_decs = election_list['desc'];
 

    elm = '';

    for (let i = 0; i < election_id.length; i++) {
        isStart = await window.contract.methods.electionStartChecker(election_id[i]).call();  
        if(isStart){
        elm += `  
            <div class="election e${i + 1}">
                <div class="election-detail">
                    <p class="election-name">${election_name[i]}<br /></p>
                    <p class="election-dead">Register Deadline: ${election_deadline[i]}<br /></p>
                    <p class="election-date">ElectionDate: ${election_date[i]}</p>  
                </div>
            <p class="election-des">${election_decs[i]}</p>
            <a href="voting.html?_name=${election_name[i]}" class="voter-btn">Voting</a>
            </div>`;
        }
    }

    document.getElementById('election-list-voter').innerHTML = elm;

}

async function listResultElection() {
    election_list = await window.contract.methods.getAllElection().call();
    election_id = election_list['ids'];
    election_name = election_list['names'];
    election_deadline = election_list['deadline'];
    election_date = election_list['date'];
    election_decs = election_list['desc'];

    elm = '';


    for (let i = 0; i < election_name.length; i++) {
        isEnd = await window.contract.methods.electionEndChecker(election_id[i]).call();
        
        if(isEnd){
        elm += `  
        <div class="election e${i + 1}" >
        <div class="election-detail">
            <p class="election-name">${election_name[i]}<br /></p>
            <p class="election-dead">Register Deadline: ${election_deadline[i]}<br /></p>
            <p class="election-date">ElectionDate: ${election_date[i]}</p>
        </div>
        <p class="election-des">${election_decs[i]}</p>
         <a href="result.html?_name=${election_name[i]}" class="result-btn">View Result</a>
        </div>
        `;
        }

    }
    document.getElementById('election-list-result').innerHTML = elm;

}


async function voterRequest(_electionID) {

    const _election_list = await window.contract.methods.getAllElection().call();
    const _election_ID = _election_list['ids'];

    for (i = 0; i <= _election_ID.length; i++) {
        if (_electionID == _election_ID[i]) {
            _election_id = _election_ID[i];
        }
    }

    console.log(account, "Voter", _electionID);
    window.contract.methods.voterRequest(_election_id).send({ from: account });

}


async function candidateRequest(_electionID) {

    const _election_list = await window.contract.methods.getAllElection().call();
    const _election_ID = _election_list['ids'];

    for (i = 0; i <= _election_ID.length; i++) {
        if (_electionID == _election_ID[i]) {
            _election_id = _election_ID[i];
        }
    }
        console.log(account, "Candidate", _electionID);
        await window.contract.methods.candidateRequest(_election_id).send({ from: account });
        alert('User' + account + ' request successfully');

}
