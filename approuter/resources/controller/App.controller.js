sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, Fragment, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("oilandgas.ui.controller.App", {

    onInit: function () {},

    onCreateProduct: function () {
      this._getCreateDialog().then((oDialog) => {
        this._resetCreateForm();
        oDialog.open();
      });
    },

    onConfirmProduct: function () {
      const name = this.byId("productNameInput").getValue().trim();
      const type = this.byId("productTypeInput").getValue().trim();
      const unit = this.byId("productUnitInput").getValue().trim();
      const description = this.byId("productDescriptionInput").getValue();
      const price = this.byId("productPriceInput").getValue();
      const stockQuantity = this.byId("productStockQuantityInput").getValue();
      const supplier = this.byId("productSupplierInput").getValue();
      const storageLocation = this.byId("productStorageLocationInput").getValue();

      if (!name) {
        MessageToast.show("Product name is required");
        return;
      }
      if (!type) {
        MessageToast.show("Product type is required");
        return;
      }

      this.byId("productsTable").getBinding("items").create({
        name: name,
        type: type,
        unit: unit || "Gallons",
        description: description,
        price: price ? Number(price) : null,
        stockQuantity: stockQuantity ? Number(stockQuantity) : 0,
        supplier: supplier,
        storageLocation: storageLocation
      }).created().then(() => {
        MessageToast.show("Product created");
      }).catch((oError) => {
        MessageBox.error(oError.message || "Failed to create product");
      });

      this._dialog.close();
    },

    onCancelDialog: function () {
      this._dialog.close();
    },

    _getCreateDialog: function () {
      if (this._dialog) {
        return Promise.resolve(this._dialog);
      }

      const oView = this.getView();
      return Fragment.load({
        id: oView.getId(),
        name: "oilandgas.ui.view.fragment.CreateProduct",
        controller: this
      }).then((oDialog) => {
        this._dialog = oDialog;
        oView.addDependent(oDialog);
        return oDialog;
      });
    },

    _resetCreateForm: function () {
      this.byId("productNameInput").setValue("");
      this.byId("productTypeInput").setValue("");
      this.byId("productUnitInput").setValue("Gallons");
      this.byId("productDescriptionInput").setValue("");
      this.byId("productPriceInput").setValue("");
      this.byId("productStockQuantityInput").setValue("");
      this.byId("productSupplierInput").setValue("");
      this.byId("productStorageLocationInput").setValue("");
    }
  });
});
