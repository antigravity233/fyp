async function modifyElection() {
    const url = window.location.search;
    const url_params = new URLSearchParams(url);
    const _electionName = url_params.get('_name');

    const _election_list = await window.contract.methods.getAllElection().call();
    const _election_ID = _election_list['ids'];
    const _election_name = _election_list['names'];

    document.getElementById('title').innerHTML =  "Modify "+ _electionName + " Detail";

    for (i = 0; i <= _election_ID.length; i++) {
        if (_electionName == _election_name[i]) {
            election_id = _election_ID[i];

        }
    }

    _name = document.getElementById('election_name').value;
    _dead = document.getElementById('election_dead').value;
    _date = document.getElementById('election_date').value;
    _desc = document.getElementById('election_desc').value;


    if ((_name === "") || (_dead === "") || (_date === "") || (_desc === "")) {
        alert('Please fill all field ！！');
    }
    else if(_dead > _date){
        alert('Election date must after the the register deadline created successfully.');
    }
    else{
        await window.contract.methods.modifyElection(election_id, _name, _dead, _date, _desc).send({ from: account });
        document.location.href = 'admin_election.html';
        alert('Election '+ _name+ ' created successfully.');
    }

}