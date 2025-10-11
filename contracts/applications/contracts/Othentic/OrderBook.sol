// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.20;

import "./IAvsLogic.sol";

contract OrderBook is IAvsLogic {
    uint256 public random = 0;
    address public attestationCenter;

    constructor(address _attestationCenter) {
        attestationCenter = _attestationCenter;
    }

    function afterTaskSubmission(
        IAttestationCenter.TaskInfo calldata _taskInfo,
        bool /* _isApproved */,
        bytes calldata /* _tpSignature */,
        uint256[2] calldata /* _taSignature */,
        uint256[] calldata /* _operatorIds */
    ) external {
        require(msg.sender == attestationCenter, "Not allowed");

        random = random + 1;
    }

    function beforeTaskSubmission(
        IAttestationCenter.TaskInfo calldata _taskInfo,
        bool _isApproved,
        bytes calldata _tpSignature,
        uint256[2] calldata _taSignature,
        uint256[] calldata _operatorIds
    ) external {
        // No implementation
    }
}
