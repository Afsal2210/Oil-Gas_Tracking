sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, Fragment, JSONModel, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("oilandgas.ui.controller.App", {

    onInit: function () {
      this._dialogs = {};
    },

    onCreateSale: function () {
      this._openDialog("oilandgas.ui.view.fragment.CreateSales", "newSale", {
        productId: "",
        quantity: null,
        unitPrice: null,
        customer: "",
        soldDate: new Date().toISOString().slice(0, 10),
        remarks: ""
      });
    },

    onConfirmSale: function (oEvent) {
      const oDialog = oEvent.getSource().getParent();
      const oData = oDialog.getModel("newSale").getData();

      if (!oData.productId) {
        MessageToast.show("Please select a product");
        return;
      }
      if (!oData.quantity || Number(oData.quantity) <= 0) {
        MessageToast.show("Quantity must be greater than 0");
        return;
      }

      this.byId("salesTable").getBinding("items").create({
        product_ID: oData.productId,
        quantity: Number(oData.quantity),
        unitPrice: oData.unitPrice ? Number(oData.unitPrice) : null,
        customer: oData.customer,
        soldDate: oData.soldDate,
        remarks: oData.remarks
      }).created().then(() => {
        MessageToast.show("Sale created");
      }).catch((oError) => {
        MessageBox.error(oError.message || "Failed to create sale");
      });

      oDialog.close();
    },

    onCreateStockIn: function () {
      this._openDialog("oilandgas.ui.view.fragment.CreateStockIn", "newStockIn", {
        productId: "",
        quantity: null,
        unitPrice: null,
        supplier: "",
        receivedDate: new Date().toISOString().slice(0, 10),
        remarks: ""
      });
    },

    onConfirmStockIn: function (oEvent) {
      const oDialog = oEvent.getSource().getParent();
      const oData = oDialog.getModel("newStockIn").getData();

      if (!oData.productId) {
        MessageToast.show("Please select a product");
        return;
      }
      if (!oData.quantity || Number(oData.quantity) <= 0) {
        MessageToast.show("Quantity must be greater than 0");
        return;
      }

      this.byId("stockInTable").getBinding("items").create({
        product_ID: oData.productId,
        quantity: Number(oData.quantity),
        unitPrice: oData.unitPrice ? Number(oData.unitPrice) : null,
        supplier: oData.supplier,
        receivedDate: oData.receivedDate,
        remarks: oData.remarks
      }).created().then(() => {
        MessageToast.show("Stock-in created");
      }).catch((oError) => {
        MessageBox.error(oError.message || "Failed to create stock-in");
      });

      oDialog.close();
    },

    onCreateProduct: function () {
      this._openDialog("oilandgas.ui.view.fragment.CreateProduct", "newProduct", {
        name: "",
        type: "",
        unit: "Gallons",
        description: ""
      });
    },

    onConfirmProduct: function (oEvent) {
      const oDialog = oEvent.getSource().getParent();
      const oData = oDialog.getModel("newProduct").getData();

      if (!oData.name) {
        MessageToast.show("Product name is required");
        return;
      }
      if (!oData.type) {
        MessageToast.show("Product type is required");
        return;
      }

      this.byId("productsTable").getBinding("items").create({
        name: oData.name,
        type: oData.type,
        unit: oData.unit || "Gallons",
        description: oData.description
      }).created().then(() => {
        MessageToast.show("Product created");
      }).catch((oError) => {
        MessageBox.error(oError.message || "Failed to create product");
      });

      oDialog.close();
    },

    onCancelDialog: function (oEvent) {
      oEvent.getSource().getParent().close();
    },

    _openDialog: function (sFragmentName, sModelName, oInitialData) {
      const oView = this.getView();

      if (this._dialogs[sFragmentName]) {
        this._dialogs[sFragmentName].setModel(new JSONModel(oInitialData), sModelName);
        this._dialogs[sFragmentName].open();
        return;
      }

      Fragment.load({
        id: oView.getId(),
        name: sFragmentName,
        controller: this
      }).then((oDialog) => {
        this._dialogs[sFragmentName] = oDialog;
        oView.addDependent(oDialog);
        oDialog.setModel(new JSONModel(oInitialData), sModelName);
        oDialog.open();
      });
    }
  });
});
