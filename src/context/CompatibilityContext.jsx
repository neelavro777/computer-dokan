import React, { createContext, useContext, useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a context
const CompatibilityContext = createContext();

// Custom hook to use the context
export const useCompatibility = () => useContext(CompatibilityContext);

// Context provider component
export const CompatibilityProvider = ({ children }) => {
  // State to store selected products
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const savedProducts = localStorage.getItem('selectedProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const[CompatibilityStatus, setCompatibilityStatus] = useState(true);
  // Function to add a product to the selected products
  const addProduct = (product) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };

  // Function to remove a product from the selected products
  const removeProduct = (productId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const removeAllProducts = () => {
    setSelectedProducts([]);
  };


  useEffect(() => {
    const checkPowerSupply = () => {
      const powerSupply = selectedProducts.find((product) => product.category === "Power Supply");
      if (powerSupply) {
        const totalPowerUsage = calculateTotalPowerUsage();
        console.log("Total power usage:", totalPowerUsage);
        const powerSupplyOutput = parseInt(powerSupply.keySpecifications["Total Output Power"]);
        if (powerSupplyOutput < totalPowerUsage) {
          toast.error("The selected power supply may not provide sufficient power for the components.");
        }
      }
    };
    checkPowerSupply();
  }, [selectedProducts]);

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);


  // Function to calculate total power usage
  const calculateTotalPowerUsage = () => {
    let totalPower = 0;
    selectedProducts.forEach((product) => {
      const powerUsage = parseInt(product.keySpecifications["Recommended PSU"]) || 0; // Default to 0 if field doesn't exist or is not a number
      totalPower += powerUsage;
    });
    return totalPower;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedProducts.forEach((product) => {
      const price = parseInt(product.price) || 0; 
      totalPrice += price;
    });
    return totalPrice;
  };

  // Function to check compatibility
// Function to check compatibility
// const checkCompatibility = () => {
//     // Iterate over selected products and check compatibility
//     for (let i = 0; i < selectedProducts.length; i++) {
//       const productA = selectedProducts[i];
//       for (let j = 0; j < selectedProducts.length; j++) {
//         const productB = selectedProducts[j];
        
//         // Check compatibility between productA and productB
//         // Memory type check
//         if (
//           productA.category === "Motherboard" &&
//           productB.category === "RAM" &&
//           productA.keySpecifications["Memory Type"] !== productB.keySpecifications["Memory Type"]
//         ) {
//         alert("Incompatible memory types: " + productA.category + " and " + productB.category);
//           return false; // Incompatible memory types
//         }

//         // CPU socket check
//         // if (
//         //   productA.category === "Processor" &&
//         //   productB.category === "Motherboard" &&
//         //   productA.keySpecifications["CPU Socket"] !== productB.keySpecifications["CPU Socket"]
//         // ) {
//         //   return false; // Incompatible CPU sockets
//         // }

//         // // PSU connector check
//         // if (
//         //   productA.category === "Power Supply" &&
//         //   productB.category === "Graphics Card" &&
//         //   parseInt(productA.keySpecifications["6Pin/8Pin Connectors"]) < parseInt(productB.keykeySpecifications["Connectors"])
//         // ) {
//         //   return false; // Insufficient PSU connectors
//         // }

//         // // MB size check
//         // if (
//         //   productA.category === "Motherboard" &&
//         //   productB.category === "Case" &&
//         //   productA.keySpecifications["Form Factor"] !== productB.keySpecifications["Supported MB Size"]
//         // ) {
//         //   return false; // Incompatible motherboard size
//         // }

//         // Add more compatibility checks as needed
//       }
//     }
//     // If no compatibility issues found, return true
//     return true;
//   };

// correct version of checkCompatibility function
  // const checkCompatibility = (addedProduct) => {
  //   for (let i = 0; i < selectedProducts.length; i++) {
  //     const productA = selectedProducts[i];
  //     const productB = addedProduct;
        
  //     if ((productA.category === "Motherboard" && productB.category === "RAM") || (productA.category === "RAM" && productB.category === "Motherboard")) {
  //       if (productA.keySpecifications["Memory Type"] !== productB.keySpecifications["Memory Type"]) {
  //         toast.error("Incompatible memory types: " + productA.category + " and " + productB.category);
  //         return false; // Incompatible memory types
  //       } else if (parseInt(productA.keySpecifications["Frequency"]) < parseInt(productB.keySpecifications["Frequency"])) {
  //         toast.error("Incompatible memory speed: " + productA.category + " and " + productB.category);
  //         return false; // Incompatible memory speed
  //       }
  //     } 
  //   }

  //   return true;
  // };

  const checkCompatibility = (addedProduct) => {
    for (let i = 0; i < selectedProducts.length; i++) {
      const productA = selectedProducts[i];
      const productB = addedProduct;
      if ((productA.category === "Motherboard" && productB.category === "RAM") || (productA.category === "RAM" && productB.category === "Motherboard")) {
         if (!MotherboardRAMCompatibility(productA, productB)) {
             return false;
         }
      } if ((productA.category === "Motherboard" && productB.category === "Processor") || (productA.category === "Processor" && productB.category === "Motherboard")) {
        if (!MotherboardProcessorCompatibility(productA, productB)) {
            return false;
        }
      }

    }

    return true;
  };

  const MotherboardRAMCompatibility = (productA, productB) => {
    if (productA.category === "Motherboard" && productB.category === "RAM") {
        if (productA.keySpecifications["Memory Type"] !== productB.keySpecifications["Memory Type"]) {
            toast.error("Incompatible memory types: " + productA.category + " and " + productB.category);
            return false; // Incompatible memory types
        } else if (parseInt(productA.keySpecifications["Frequency"]) < parseInt(productB.keySpecifications["Frequency"])) {
            toast.error("Incompatible memory speed: " + productA.category + " and " + productB.category);
            return false;
        }
    } else {
        if (productB.keySpecifications["Memory Type"] !== productA.keySpecifications["Memory Type"]) {
            toast.error("Incompatible memory types: " + productB.category + " and " + productA.category);
            return false; // Incompatible memory types
        } else if (parseInt(productB.keySpecifications["Frequency"]) < parseInt(productA.keySpecifications["Frequency"])) {
            toast.error("Incompatible memory speed: " + productB.category + " and " + productA.category);
            return false;
        }
    }
    return true;
};

const MotherboardProcessorCompatibility = (productA, productB) => {
    if (productA.category === "Motherboard" && productB.category === "Processor") {
        if ((productA.keySpecifications["Socket"].includes("LGA") && productB.product.includes("AMD")) || (productA.keySpecifications["Socket"].includes("AM") && productB.product.includes("Intel"))){
          toast.error(`Incompatible ${productA.category} and ${productB.category}. Please select an ${productB.product.match(/(Intel|AMD)/i) ? (productB.product.includes("Intel") ? "AMD" : "Intel") : "Intel or AMD"} processor`);
            return false; // Incompatible CPU sockets
        }
    } else {
        if ((productA.product.includes("AMD") && productB.keySpecifications['Socket'].includes("LGA")) || (productA.product.includes("Intel") && productB.keySpecifications['Socket'].includes("AM"))) {
            toast.error(`Incompatible ${productB.category} and ${productA.category}. Please select an ${productA.product.match(/(Intel|AMD)/i) ? (productA.product.includes("AMD") ? "AMD" : "Intel") : "Intel or AMD"} Motherboard`);
            return false; // Incompatible CPU sockets
        }
    }
    return true;
}

  
  return (
    <CompatibilityContext.Provider
      value={{ selectedProducts, addProduct, removeProduct, checkCompatibility, calculateTotalPowerUsage, calculateTotalPrice, removeAllProducts}}
    >
      {children}
    </CompatibilityContext.Provider>
  );
};
