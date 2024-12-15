async function editProfile() {
    const url = window.location.search;
    const url_params = new URLSearchParams(url);
    const _electionName = url_params.get('_name');

    const _election_list = await window.contract.methods.getAllElection().call();
    const _election_ID = _election_list['ids'];
    const _election_name = _election_list['names'];

    for (i = 0; i <= _election_ID.length; i++) {
        if (_electionName == _election_name[i]) {
            election_id = _election_ID[i];

        }
    };

    _name = document.getElementById('can-name').value;
    _age = document.getElementById('can-age').value;
    _desc = document.getElementById('can-desc').value;

        if (!(_name === "")&& !(_age === "")&& !(_desc === "")) {
            await window.contract.methods.editProfile(election_id, _name, _age, _desc).send({ from: account });
            console.log('Candidate'+ account + ' update candidate profile successfully.');
            document.location.href = 'election.html';
        }

}