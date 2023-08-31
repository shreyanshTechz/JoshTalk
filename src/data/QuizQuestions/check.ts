import React, { useEffect, useState } from 'react';
import { Topic } from '.';

// interface Received {
//     "response_code": number,
//     "results":Topic[]
//   }
  export async function fetchApiData() {
    const headersList: Record<string, string> = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };
  
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=15", {
        method: "GET",
        headers: headersList
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data: string = await response.text();
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
  