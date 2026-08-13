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

    onCreateProduct: function () {
      this._openDialog("oilandgas.ui.view.fragment.CreateProduct", "newProduct", {
        name: "",
        type: "",
        unit: "Gallons",
        description: "",
        price: null,
        stockQuantity: null,
        supplier: "",
        storageLocation: ""
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
        description: oData.description,
        price: oData.price ? Number(oData.price) : null,
        stockQuantity: oData.stockQuantity ? Number(oData.stockQuantity) : 0,
        supplier: oData.supplier,
        storageLocation: oData.storageLocation
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
