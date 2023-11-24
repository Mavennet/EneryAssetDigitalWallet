"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useContractEvent } from 'wagmi'

const LoginForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);
  const formData = watch();
  
  const formSubmit = (data: any) => {
    console.log(data);
    setShow(true);

  };

  const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "emissionToken",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "greenToken",
          "type": "address"
        }
      ],
      "name": "TransferFromToken",
      "type": "event"
    }
  ];



  return (
    <div>
      Dashboard
    </div>
  );
};

export default LoginForm;

