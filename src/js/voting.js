

async function candidateList() {

    const url = window.location.search;
    const url_params = new URLSearchParams(url);
    const _electionName = url_params.get('_name');

    const _election_list = await window.contract.methods.getAllElection().call();
    const _election_ID = _election_list['ids'];
    const _election_name = _election_list['names'];

    for (i = 0; i <= _election_name.length; i++) {
        if (_electionName == _election_name[i]) {
            _election_id = _election_ID[i];
        }
    }

    const _candidate_list = await window.contract.methods.getAllCandidate(_election_id).call();
    const _candidate_address = _candidate_list['candidateAddress'];
    const _candidate_name = _candidate_list['candidateName'];
    const _candidate_age = _candidate_list['candidateAge'];
    const _candidate_desc = _candidate_list['candidateDesc'];

    elm = '';

    for (i = 0; i <= _candidate_name.length - 1; i++) {

        elm += `
            <div id="candiddate_detail">
                <img src="./img/profile.png" id="can_img">
                <p class="title">Name: </p>
                <p class="detail" id="name">${_candidate_name[i]}</p>
                <p class="title">Age: </p>
                <p class="detail" id="age">${_candidate_age[i]}</p>
                <p class="title">Description:</p>
                <p class="detail" id="desc">${_candidate_desc[i]}</p>
                <input type="button" name="vote-btn" id="vote-btn" value="Vote" onclick="voting('${_candidate_address[i]}', '${_election_id}')"/>
            </div>
            `;
    }
    document.getElementById('candiddate_list').innerHTML = elm;

}

async function voting(_candidateAddress, _electionID) {
  
        await window.contract.methods.voteCandidate(_candidateAddress, _electionID).send({ from: account });
        alert('Vote \'' + _candidateAddress + ' \' successfully');
        document.location.href = 'election.html';


}




