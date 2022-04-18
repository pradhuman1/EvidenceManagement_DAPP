// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;

contract evidence{
    struct station{
        string name;
        string location;
    }

    struct Evidence{
        string Title;
        string id;
    }

    struct Fir{
        string Title;
        string Description;
        uint256 time;
        address creator;
        uint256[] evidences_arr;
    }


    address public administrator;
    mapping(address => uint256) public police_men;
    mapping(uint256 => Evidence) public evidences;
    mapping(uint256 => Fir) public Firs;
    station[] public stations;
    uint256 public numEvidence;
    uint256 public numFir;


    modifier restricted() {
        require(msg.sender == administrator);
        _;
    }
    constructor(){
        administrator = msg.sender;
        numFir=0;
    }

    function createPolice(address police_address)public restricted{
        police_men[police_address]=1;        
    }
    function createFir(string memory Title,string memory Description, uint256 time) public{
        require(police_men[msg.sender]==1);
        Fir storage newFir = Firs[numFir++];
        newFir.Title = Title;
        newFir.Description = Description;
        newFir.time = time;
        newFir.creator = msg.sender;
    }
    function createEvidence(string memory id,string memory Title,uint256 FirID) public{
        require(Firs[FirID].time!=0);
        Evidence storage newEvidence = evidences[numEvidence++];
        newEvidence.id = id;
        newEvidence.Title = Title;
        Firs[FirID].evidences_arr.push(numEvidence-1);
    }
    function createStation(string memory name,string memory location) public restricted{
        stations.push(station(name,location));
    }

}
