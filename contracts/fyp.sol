// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address[] public userAddresses; // Track all user addresses
    address[] public adminAddresses; // Track all user addresses
    uint256[] public election; // Track all election
    uint256[] public request; // Track all request
    uint256 public codeOfElection = 1001; // code for election ID
    uint256 public codeOfRequest = 2001; // code for request ID

    struct registeredUser {
        string userName;
        string userEmail;
        string userPassword;
        bool registered;
    }

    struct registeredAdmin {
        string adminName;
        string adminEmail;
        string adminPassword;
        bool registered;
    }

    struct userRequest {
        address userAddress;
        string userName;
        uint256 electionID;
        string role;
    }

    struct registeredELection {
        string electionName;
        string deadline;
        string electionDate;
        string electionDesc;
        string electionStatus;
        address[] validatedVoter;
        mapping(address => address) vote;
        mapping(address => bool) isVoter;
        address[] validatedCandidate;
        mapping(address => string) candidateName;
        mapping(address => uint256) candidateAge;
        mapping(address => string) candidateDesc;
        mapping(address => uint256) candidateVote;
        mapping(address => bool) isCandidate;
    }

    mapping(address => registeredUser) user;
    mapping(address => registeredAdmin) admin;
    mapping(uint256 => userRequest) requests;
    mapping(uint256 => registeredELection) elections;

    event userRegister(
        address indexed userAddresses,
        string name,
        string email,
        string password
    );
    event adminRegister(
        address indexed adminAddresses,
        string name,
        string email,
        string password
    );
    event userReset(address indexed userAddresses, string password);
    event adminReset(address indexed adminAddresses, string password);
    event requestSent(
        address indexed userAddresses,
        uint256 election,
        string role
    );
    event requestValidate(
        address indexed adminAddresses,
        uint256 election,
        string role
    );
    event electionStarted(uint256 indexed election, string status);
    event electionEnded(uint256 indexed election, string status);
    event userVoting(
        address indexed userAddresses,
        uint256 election,
        address indexed canAddresses
    );
    event candidateProfile(
        address indexed canAddresses,
        uint256 election,
        string name,
        uint256 age,
        string desc
    );
    event electionCreated(
        uint256 indexed election,
        string name,
        string deadline,
        string electionDate,
        string electionDesc
    );
    event electionModify(
        uint256 indexed election,
        string name,
        string deadline,
        string electionDate,
        string electionDesc
    );

    //user modules
    function userSignUp(
        address _newUserAddress,
        string memory _name,
        string memory _email,
        string memory _password
    ) public returns (bool isSuccess) {
        require(
            user[_newUserAddress].registered == false,
            "Error : User already exist"
        );
        bool condition = false;
        user[_newUserAddress].userName = _name;
        user[_newUserAddress].userEmail = _email;
        user[_newUserAddress].userPassword = _password;
        user[_newUserAddress].registered = true;
        userAddresses.push(_newUserAddress);

        emit userRegister(_newUserAddress, _name, _email, _password);

        condition = true;
        return condition;
    }

    function resetUserPassword(string memory _newPassword)
        public
        returns (bool isSuccess)
    {
        bool condition = false;

        user[msg.sender].userPassword = _newPassword;

        emit userReset(msg.sender, _newPassword);

        condition = true;
        return condition;
    }

    //admin modules
    function adminSignUp(
        address _newAdminAddress,
        string memory _name,
        string memory _email,
        string memory _password
    ) public returns (bool isSuccess) {
        require(
            admin[_newAdminAddress].registered == false,
            "Error : Admin already exist"
        );

        bool condition = false;

        admin[_newAdminAddress].adminName = _name;
        admin[_newAdminAddress].adminEmail = _email;
        admin[_newAdminAddress].adminPassword = _password;
        admin[_newAdminAddress].registered = true;
        adminAddresses.push(_newAdminAddress);
        emit adminRegister(_newAdminAddress, _name, _email, _password);
        condition = true;
        return condition;
    }

    function resetAdminPassword(string memory _newPassword)
        public
        returns (bool isSuccess)
    {
        bool condition = false;
        require(bytes(_newPassword).length != 0, "New Password cannot empty");

        admin[msg.sender].adminPassword = _newPassword;

        emit adminReset(msg.sender, _newPassword);

        condition = true;
        return condition;
    }

    function validateVoter(
        address _newVoterAddress,
        uint256 _electionID,
        uint256 _requestID
    ) public returns (bool isSuccess) {
        bool condition = false;

        elections[_electionID].validatedVoter.push(_newVoterAddress);
        elections[_electionID].isVoter[_newVoterAddress] = true;
        removeRequest(_requestID);
        condition = true;
        return condition;
    }

    function validateCandidate(
        address _newCandidateAddress,
        uint256 _electionID,
        uint256 _requestID
    ) public returns (bool isSuccess) {
        bool condition = false;
        elections[_electionID].validatedCandidate.push(_newCandidateAddress);
        elections[_electionID].candidateVote[_newCandidateAddress] = 0;
        elections[_electionID].isCandidate[_newCandidateAddress] = true;
        removeRequest(_requestID);
        condition = true;
        return condition;
    }

    function removeRequest(uint256 _requestID) public returns (bool isSuccess) {
        bool condition = false;
        uint256 indexToRemove = 0;

        for (uint256 i = 0; i < request.length; i++) {
            if (
                keccak256(abi.encodePacked(request[i])) ==
                keccak256(abi.encodePacked(_requestID))
            ) {
                indexToRemove = i;
                condition = true;
                break;
            }
        }

        // If the product is found in the array
        if (condition) {
            for (uint256 i = indexToRemove; i < request.length - 1; i++) {
                request[i] = request[i + 1];
            }
            request.pop();
        }

        return condition;
    }

    //election modules
    function createElection(
        string memory _electionName,
        string memory _deadline,
        string memory _electionDate,
        string memory _electionDesc
    ) public returns (bool isSuccess) {
        bool condition = false;
        require(bytes(_electionName).length > 0, "Election Name cannot empty");
        require(bytes(_deadline).length > 0, "Register Deadline cannot empty");
        require(bytes(_electionDate).length > 0, "Election Date cannot empty");
        require(
            bytes(_electionDesc).length != 0,
            "Election Description cannot empty"
        );

        elections[codeOfElection].electionName = _electionName;
        elections[codeOfElection].deadline = _deadline;
        elections[codeOfElection].electionDate = _electionDate;
        elections[codeOfElection].electionDesc = _electionDesc;
        elections[codeOfElection].electionStatus = "Waiting";
        election.push(codeOfElection);

        emit electionCreated(
            codeOfElection,
            _electionName,
            _deadline,
            _electionDate,
            _electionDesc
        );

        codeOfElection++;
        condition = true;
        return condition;
    }

    function startElection(uint256 _electionID)
        public
        returns (bool isSuccess)
    {
        bool condition = false;
        require(
            admin[msg.sender].registered == true,
            "Error : Must be a admin"
        );

        elections[_electionID].electionStatus = "Started";
        emit electionStarted(_electionID, "Started");
        condition = true;
        return condition;
    }

    function endElection(uint256 _electionID) public returns (bool isSuccess) {
        bool condition = false;
        require(
            admin[msg.sender].registered == true,
            "Error : Must be a admin"
        );

        elections[_electionID].electionStatus = "Ended";
        emit electionEnded(_electionID, "Ended");
        condition = true;
        return condition;
    }

    function modifyElection(
        uint256 _electionID,
        string memory _electionName,
        string memory _deadline,
        string memory _electionDate,
        string memory _electionDesc
    ) public returns (bool isSuccess) {
        bool condition = false;

        require(_electionID > 0, "Election ID cannot empty");
        require(bytes(_electionName).length > 0, "Election Name cannot empty");
        require(bytes(_deadline).length > 0, "Register Deadline cannot empty");
        require(bytes(_electionDate).length > 0, "Election Date cannot empty");
        require(
            bytes(_electionDesc).length != 0,
            "Election Description cannot empty"
        );

        //update new data
        elections[_electionID].electionName = _electionName;
        elections[_electionID].deadline = _deadline;
        elections[_electionID].electionDate = _electionDate;
        elections[_electionID].electionDesc = _electionDesc;

        emit electionModify(
            election[_electionID],
            _electionName,
            _deadline,
            _electionDate,
            _electionDesc
        );

        condition = true;

        return condition;
    }

    //voter modules
    function voteCandidate(address _candidateAddress, uint256 _electionID)
        public
        returns (bool isSuccess)
    {
        bool condition = false;
        require(
            _candidateAddress != address(0),
            "Candidate address cannot empty"
        );
        require(_electionID > 0, "Election ID cannot empty");
        

        // Retrieve current vote
        address currentVote = elections[_electionID].vote[msg.sender];

        // If already voted for the same candidate
        if (currentVote == _candidateAddress) {
            revert("Already voted for this candidate");
        } else if (!voterChecker(_electionID)) {
            revert("Not resgisted voter for this election");
        } else if (elections[_electionID].vote[msg.sender] != address(0)) {
            // Decrement vote count for the previous candidate if exists
            elections[_electionID].candidateVote[currentVote]--;
            elections[_electionID].candidateVote[_candidateAddress]++;
            elections[_electionID].vote[msg.sender] = _candidateAddress;

            emit userVoting(msg.sender, _electionID, _candidateAddress);
            condition = true;
        } else {
            // Increment vote count for the new candidate
            elections[_electionID].candidateVote[_candidateAddress]++;
            elections[_electionID].vote[msg.sender] = _candidateAddress;
            emit userVoting(msg.sender, _electionID, _candidateAddress);
            condition = true;
        }

        return condition;
    }

    function voterRequest(uint256 _electionID) public returns (bool isSuccess) {
        bool condition = false;

        require(_electionID > 0, "Election ID cannot empty");

        request.push(codeOfRequest);
        requests[codeOfRequest].userAddress = msg.sender;
        requests[codeOfRequest].electionID = _electionID;
        requests[codeOfRequest].role = "Voter";
        codeOfRequest++;

        emit requestSent(msg.sender, _electionID, "Voter");
        condition = true;
        return condition;
    }

    // candidate module
    function editProfile(
        uint256 _electionID,
        string memory _name,
        uint256 _age,
        string memory _description
    ) public returns (bool isSuccess) {
        bool condition = false;
        require(bytes(_name).length > 0, "Candidate name cannot empty");
        require(_age > 0, "Candidate age cannot empty");
        require(bytes(_description).length > 0, "Candidate name cannot empty");

        if (!candidateChecker(_electionID)) {
            revert("Not resgisted candidate for this election");
        } else {
            elections[_electionID].candidateName[msg.sender] = _name;
            elections[_electionID].candidateAge[msg.sender] = _age;
            elections[_electionID].candidateDesc[msg.sender] = _description;

            emit candidateProfile(
                msg.sender,
                _electionID,
                _name,
                _age,
                _description
            );
            condition = true;
        }

        return condition;
    }

    function candidateRequest(uint256 _electionID)
        public
        returns (bool isSuccess)
    {
        bool condition = false;

        require(_electionID > 0, "Election ID cannot empty");

        request.push(codeOfRequest);
        requests[codeOfRequest].userAddress = msg.sender;
        requests[codeOfRequest].electionID = _electionID;
        requests[codeOfRequest].role = "Candidate";
        codeOfRequest++;
        condition = true;
        emit requestSent(msg.sender, _electionID, "Candidate");
        return condition;
    }

    // tool
    function userChecker(address _address) public view returns (bool isTrue) {
        return user[_address].registered;
    }

    function userPasswordChecker(address _address, string memory _password)
        public
        view
        returns (bool isTrue)
    {
        if (
            keccak256(abi.encodePacked(_password)) ==
            keccak256(abi.encodePacked(user[_address].userPassword))
        ) {
            return true;
        }

        return false;
    }

    function userEmailChecker(address _address, string memory _email)
        public
        view
        returns (bool isTrue)
    {
        if (
            keccak256(abi.encodePacked(_email)) ==
            keccak256(abi.encodePacked(user[_address].userEmail))
        ) {
            return true;
        }

        return false;
    }

    function adminChecker(address _address) public view returns (bool isTrue) {
        return admin[_address].registered;
    }

    function adminPasswordChecker(address _address, string memory _password)
        public
        view
        returns (bool isTrue)
    {
        if (
            keccak256(abi.encodePacked(_password)) ==
            keccak256(abi.encodePacked(admin[_address].adminPassword))
        ) {
            return true;
        }

        return false;
    }

    function adminEmailChecker(address _address, string memory _email)
        public
        view
        returns (bool isTrue)
    {
        if (
            keccak256(abi.encodePacked(_email)) ==
            keccak256(abi.encodePacked(admin[_address].adminEmail))
        ) {
            return true;
        }

        return false;
    }

    function voterChecker(uint256 _electionID)
        public
        view
        returns (bool isTrue)
    {
        return elections[_electionID].isVoter[msg.sender];
    }

    function candidateChecker(uint256 _electionID)
        public
        view
        returns (bool isTrue)
    {
        return elections[_electionID].isCandidate[msg.sender];
    }

    function electionWaitChecker(uint256 _electionID)
        public
        view
        returns (bool isTrue)
    {
        for (uint256 i = 0; i < election.length; i++)
            if (
                keccak256(abi.encodePacked("Waiting")) ==
                keccak256(
                    abi.encodePacked(elections[_electionID].electionStatus)
                )
            ) {
                return true;
            }

        return false;
    }

    function electionStartChecker(uint256 _electionID)
        public
        view
        returns (bool isTrue)
    {
        for (uint256 i = 0; i < election.length; i++)
            if (
                keccak256(abi.encodePacked("Started")) ==
                keccak256(
                    abi.encodePacked(elections[_electionID].electionStatus)
                )
            ) {
                return true;
            }

        return false;
    }

    function electionEndChecker(uint256 _electionID)
        public
        view
        returns (bool isTrue)
    {
        for (uint256 i = 0; i < election.length; i++)
            if (
                keccak256(abi.encodePacked("Ended")) ==
                keccak256(
                    abi.encodePacked(elections[_electionID].electionStatus)
                )
            ) {
                return true;
            }

        return false;
    }

    // display function
    function getAllUser()
        public
        view
        returns (
            address[] memory usersAddress,
            string[] memory userNames,
            string[] memory userEmails
        )
    {
        uint256 userCount = userAddresses.length;
        address[] memory userAddress = new address[](userCount);
        string[] memory names = new string[](userCount);
        string[] memory emails = new string[](userCount);

        for (uint256 i = 0; i < userCount; i++) {
            userAddress[i] = userAddresses[i];
            names[i] = user[userAddresses[i]].userName;
            emails[i] = user[userAddresses[i]].userEmail;
        }

        return (userAddress, names, emails);
    }

    function getAllRequest()
        public
        view
        returns (
            uint256[] memory requestID,
            address[] memory addresses,
            uint256[] memory electionID,
            string[] memory role
        )
    {
        uint256 requestCount = request.length;
        uint256[] memory requestIDs = new uint256[](requestCount);
        address[] memory usersAddress = new address[](requestCount);
        uint256[] memory electionIDs = new uint256[](requestCount);
        string[] memory roles = new string[](requestCount);

        for (uint256 i = 0; i < requestCount; i++) {
            requestIDs[i] = request[i];
            usersAddress[i] = requests[request[i]].userAddress;
            electionIDs[i] = requests[request[i]].electionID;
            roles[i] = requests[request[i]].role;
        }

        return (requestIDs, usersAddress, electionIDs, roles);
    }

    function getAllElection()
        public
        view
        returns (
            uint256[] memory ids,
            string[] memory names,
            string[] memory deadline,
            string[] memory date,
            string[] memory desc,
            string[] memory status
        )
    {
        uint256 electionCount = election.length;

        uint256[] memory electionsIDs = new uint256[](electionCount);
        string[] memory electionNames = new string[](electionCount);
        string[] memory electionDeadlines = new string[](electionCount);
        string[] memory electionDates = new string[](electionCount);
        string[] memory electionDescs = new string[](electionCount);
        string[] memory electionsStatus = new string[](electionCount);

        for (uint256 i = 0; i < electionCount; i++) {
            electionsIDs[i] = election[i];
            electionNames[i] = elections[election[i]].electionName;
            electionDeadlines[i] = elections[election[i]].deadline;
            electionDates[i] = elections[election[i]].electionDate;
            electionDescs[i] = elections[election[i]].electionDesc;
            electionsStatus[i] = elections[election[i]].electionStatus;
        }

        return (
            electionsIDs,
            electionNames,
            electionDeadlines,
            electionDates,
            electionDescs,
            electionsStatus
        );
    }

    function getAllCandidate(uint256 _electionID)
        public
        view
        returns (
            address[] memory candidateAddress,
            string[] memory candidateName,
            uint256[] memory candidateAge,
            string[] memory candidateDesc,
            uint256[] memory candidateVote
        )
    {
        uint256 count = elections[_electionID].validatedCandidate.length;
        uint256 _id = _electionID;
        address[] memory candidates = elections[_electionID].validatedCandidate;
        string[] memory canNames = new string[](count);
        uint256[] memory canAges = new uint256[](count);
        string[] memory canDescs = new string[](count);
        uint256[] memory canVotes = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            canNames[i] = elections[_id].candidateName[candidates[i]];
            canAges[i] = elections[_id].candidateAge[candidates[i]];
            canDescs[i] = elections[_id].candidateDesc[candidates[i]];
            canVotes[i] = elections[_id].candidateVote[candidates[i]];
        }

        return (candidates, canNames, canAges, canDescs, canVotes);
    }
}
