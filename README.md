# micro-frontend
This repository contains a micro-frontend Proof of Concept (POC) application demonstrating the capabilities of Webpack Module Federation in a React ecosystem.

# Micro-Frontend Apps: Insurance System  

This repository contains three micro-frontend applications:  
1. **Insurance Details** (`insurance-details`)  
2. **Premium Calculator** (`premium-calculator`)  
3. **Insurance Container** (`insurance-container`)  

Live URLs:
1. **Insurance Container App (Main Application)** `https://mfeapp.z13.web.core.windows.net/insurance-container/index.html`
2. **Insurance Detail App (MFE#1)**	`https://mfeapp.z13.web.core.windows.net/insurance-detail/index.html`
3. **Premium Calculator App (MFE#2)**	`https://mfeapp.z13.web.core.windows.net/premium-calculator/index.html`



These apps leverage **Webpack Module Federation** to demonstrate dynamic module sharing and micro-frontend integration.

---

## **Getting Started**

### Prerequisites  
Ensure you have the following installed on your system:  
- **Node.js** (v22.12.0)  
- **npm** (v10.9.0 or later)

### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/AteetAgarwal/micro-frontend.git
   ```
   Note: Kindly refer main branch only.

2. Navigate to the parent folder:  
   ```bash
   cd micro-frontend
   ```

3. Install dependencies for each app:  
   ```bash
   cd insurance-details
   npm install
   cd ../premium-calculator
   npm install
   cd ../insurance-container
   npm install
   ```

---

## **Running the Applications**

To execute the apps using Webpack, follow these steps:

### **1. Insurance Details App**
1. Navigate to the app directory:  
   ```bash
   cd insurance-details
   ```

2. Run the Webpack:  
   ```bash
   npm run webpack
   ```
3. Browse to URL: http://localhost:8006

### **2. Premium Calculator App**
1. Navigate to the app directory:  
   ```bash
   cd premium-calculator
   ```

2. Run the Webpack build:  
   ```bash
   npm run webpack
   ```
3. Browse to URL: http://localhost:8005   

### **3. Insurance Container App**
1. Navigate to the app directory:  
   ```bash
   cd insurance-container
   ```

2. Run the Webpack build:  
   ```bash
   npm run webpack
   ```
3. Browse to URL: http://localhost:8003

---

## **Integration via Module Federation**

Each app can be run independently but is designed to demonstrate **dynamic module federation** for sharing components and logic across micro-frontends.  

---

## **Troubleshooting**

- Ensure all dependencies are installed correctly.  
- If ports conflict, modify the port in the respective `webpack.config.js` file.  
- For issues with Webpack builds, check the Webpack logs for detailed error messages.  

---

Let me know if you’d like further refinements or additions! 🚀
