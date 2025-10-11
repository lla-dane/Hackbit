// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {OApp, MessagingFee, Origin} from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import {MessagingReceipt} from "@layerzerolabs/oapp-evm/contracts/oapp/OAppSender.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token1 is OApp, ERC20 {
    uint dec = 10 ** 18;

    uint _number = 0;
    string _message = "";
    address _addr = address(0);

    // COMMANDS
    string public constant SWAP = "SWAP";

    constructor(
        address _endpoint,
        address _owner
    ) OApp(_endpoint, _owner) Ownable(_owner) ERC20("ZRO1", "ZRO1") {
        uint amount = 1000 * dec;
        _mint(_owner, amount);
    }

    function mint(address recipient, uint amount) external onlyOwner {
        _mint(recipient, amount);
    }

    function burn(address _owner, uint amount) external {
        _burn(_owner, amount);
    }

    function isSwap(string memory _msg) internal pure returns (bool) {
        return
            keccak256(abi.encodePacked(_msg)) ==
            keccak256(abi.encodePacked(SWAP));
    }

    function quote(
        uint32 _dstEid,
        uint _num,
        address _address,
        string memory _msg,
        bytes memory _options,
        bool
    ) external view returns (MessagingFee memory fee) {
        bytes memory _payload = abi.encode(_address, _num, _msg);
        fee = _quote(_dstEid, _payload, _options, false);
    }

    function lzSend(
        uint32 _dstEid,
        uint _num,
        address _address,
        string memory _msg,
        bytes calldata _options
    ) external payable returns (MessagingReceipt memory receipt) {
        bytes memory _payload = abi.encode(_address, _num, _msg);
        receipt = _lzSend(
            _dstEid,
            _payload,
            _options,
            MessagingFee(msg.value, 0),
            payable(msg.sender)
        );

        // Burn the amount of tokens that are going to be swapped
        if (isSwap(_msg)) {
            if (_num <= 0) {
                return receipt;
            }
            _burn(_address, _num);
        }
    }

    function _lzReceive(
        Origin calldata,
        bytes32,
        bytes calldata payload,
        address,
        bytes calldata
    ) internal override {
        (_addr, _number, _message) = abi.decode(
            payload,
            (address, uint, string)
        );

        handleCrossChainMessage();
    }

    function handleCrossChainMessage() internal {
        // Mint the requested amount of tokens
        if (isSwap(_message)) {
            _mint(_addr, _number);
        }

        _message = "";
        _addr = address(0);
        _number = 0;
    }
}
