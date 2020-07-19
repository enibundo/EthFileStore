pragma solidity ^0.6.0;

pragma experimental ABIEncoderV2;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract EthFileStore
{
    event FileStored(string fileId);
    
    mapping (address => string[]) AddressToFileIds;
    
    function StoreFile(string memory fileId) payable public
    {
        require (msg.value > 0.1 ether, "Not enough ether sent");
        
        AddressToFileIds[msg.sender].push(fileId);
    
        emit FileStored(fileId);
    }
    
    function ViewMyStoredFiles() public view returns (string[] memory)
    {
        return AddressToFileIds[msg.sender];
    }
}
