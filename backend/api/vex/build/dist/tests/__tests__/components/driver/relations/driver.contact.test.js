"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */
// test suite
describe("", function () {
    it("", function () {
        return __awaiter(this, void 0, void 0, function* () { });
    });
});
// describe("POST /org/driver/contact/save", function () {
//   it("Should save driver contact", async function () {
//     const response = request(app).post("/org/driver/contact/save").send(driverContact);
//     // forçador de erro para verificar os campo,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");
//     expect((await response).status).toBe(201);
//   });
// });
// describe("PUT /org/driver/contact/update", function () {
//   it("Should update driver contact", async function () {
//     const response = request(app)
//       .put("/org/driver/contact/update/22")
//       .send(driverContact);
//     // forçador de erro para verificar os campos,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");
//     expect((await response).status).toBe(201);
//   });
// });
// describe("GET /org/driver/contact/get-all", function () {
//   it("Should get all driver contact", async function () {
//     const response = request(app).get("/org/driver/contact/get-all?page=1&size=10");
//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });
// describe("GET /org/driver/contact/get-by-id/:id", function () {
//   it("Should get driver contact by id", async function () {
//     const response = request(app).get("/org/driver/contact/get-by-id/22");
//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });
// describe("DELETE /org/driver/contact/delete-all", function () {
//   it("Should delete driver contact", async function () {
//     const response = request(app).delete("/org/driver/contact/delete-all");
//     expect((await response).status).toBe(204);
//   });
// });
// describe("DELETE /org/driver/contact/delete-by-id/:id", function () {
//   it("Should delete driver contact by id", async function () {
//     const response = request(app).delete("/org/driver/contact/delete-by-id/23");
//     expect((await response).status).toBe(204);
//   });
// });
