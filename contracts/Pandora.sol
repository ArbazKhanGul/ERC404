//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./ERC404.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Pandora is ERC404 {
    string public dataURI="https://ipfs.filebase.io/ipfs/";
    string public baseTokenURI;

    constructor(
        address _owner
    ) ERC404("Forked Pandora", "FKPANDORA", 18, 10000, _owner) {
        balanceOf[_owner] = 10000 * 10 ** 18;
    }

    function setDataURI(string memory _dataURI) public onlyOwner {
        dataURI = _dataURI;
    }

    function setTokenURI(string memory _tokenURI) public onlyOwner {
        baseTokenURI = _tokenURI;
    }

    function setNameSymbol(
        string memory _name,
        string memory _symbol
    ) public onlyOwner {
        _setNameSymbol(_name, _symbol);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        if (bytes(baseTokenURI).length > 0) {
            return string.concat(baseTokenURI, Strings.toString(id));
        } else {
            uint8 seed = uint8(bytes1(keccak256(abi.encodePacked(id))));
            string memory image;
            string memory color;

            if (seed <= 100) {
                image = "QmXgQrtsCW81Y4FdgsDq5mwzUcbPom49uxvg5hJ9JtuBKw";
                color = "Green";
            } else if (seed <= 160) {
                image = "QmXCuVxV8LaCgMJH9mHRbDCx26b4Jpu1inhPWBhKJxWfdN";
                color = "Yellow";
            } else if (seed <= 210) {
                image = "QmYXiqNY46bQJpie8gJSaeNMxM431puHdarVThhFVn57PM";
                color = "Purple";
            } else if (seed <= 240) {
                image = "QmXgd4Y9qjmRG6M1XeYSJviPBWcQiSPKfSA3PsqCakT42S";
                color = "Grey";
            } else if (seed <= 255) {
                image = "Qme2c8Peec6sjb52ntX3LUrv7WRwo8sJmBjjxKfKSdDLdV";
                color = "Red";
            }

            string memory jsonPreImage = string.concat(
                string.concat(
                    string.concat('{"name": "Forked Pandora #', Strings.toString(id)),
                    '","description":"A collection of 10,000 Replicants enabled by ERC404, an experimental token standard.","external_url":"https://pandora.build","image":"'
                ),
                string.concat(dataURI, image)
            );
            string memory jsonPostImage = string.concat(
                '","attributes":[{"trait_type":"Color","value":"',
                color
            );
            string memory jsonPostTraits = '"}]}';

            return
                string.concat(
                    "data:application/json;utf8,",
                    string.concat(
                        string.concat(jsonPreImage, jsonPostImage),
                        jsonPostTraits
                    )
                );
        }
    }
}

