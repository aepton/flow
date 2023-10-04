import { createSlice } from "@reduxjs/toolkit";

export const flowSlice = createSlice({
  name: "flow",
  initialState: {
    cards: [],
    cellId: -1,
    clusters: {},
    edges: [
      {"source":"card_6033845d-8a34-4b39-ada7-e294e3417060","target":"card_5a344c7e-7bfc-47fc-8823-44646acfd630"},{"source":"card_5a344c7e-7bfc-47fc-8823-44646acfd630","target":"card_759a6c99-9344-47a8-b876-68b9b1cd250d"},{"source":"card_759a6c99-9344-47a8-b876-68b9b1cd250d","target":"card_dae4815b-bc66-41e6-af6a-42ef854832a5"},{"source":"card_dae4815b-bc66-41e6-af6a-42ef854832a5","target":"card_cadd456b-81f1-488c-9c4d-075705706c62"},{"source":"card_cadd456b-81f1-488c-9c4d-075705706c62","target":"card_cdeac39f-d46d-4669-83b6-ca9c07716513"},{"source":"card_cdeac39f-d46d-4669-83b6-ca9c07716513","target":"card_b2d88efa-dc77-4854-a92e-74e446fdc279"},{"source":"card_b2d88efa-dc77-4854-a92e-74e446fdc279","target":"card_b35ac369-e8bc-4e02-89ae-fbf9605f3f2d"},{"source":"card_b35ac369-e8bc-4e02-89ae-fbf9605f3f2d","target":"card_f1d85069-b88b-41be-ba0b-d3f1ddba9760"},{"source":"card_f1d85069-b88b-41be-ba0b-d3f1ddba9760","target":"card_60d276e6-8908-428b-aefa-e3c706a01d87"},{"source":"card_60d276e6-8908-428b-aefa-e3c706a01d87","target":"card_1dafe6fd-afa5-4eb7-baa9-b42d0b75e6c8"},{"source":"card_1dafe6fd-afa5-4eb7-baa9-b42d0b75e6c8","target":"card_252e46e1-b4f8-4e6f-8287-c5965841052b"},{"source":"card_b3edf959-65c2-4ed3-84fe-a37cb572ff9b","target":"card_5b3d4b88-d1a9-4680-950c-a25705320732"},{"source":"card_5b3d4b88-d1a9-4680-950c-a25705320732","target":"card_6adce658-e2dc-4e1f-acb1-1a4b04720f9a"},{"source":"card_6adce658-e2dc-4e1f-acb1-1a4b04720f9a","target":"card_11661b7a-3844-4336-89b1-829fde047fd3"},{"source":"card_11661b7a-3844-4336-89b1-829fde047fd3","target":"card_f1ff4757-7310-40dc-91f5-979f91e97cbf"},{"source":"card_a5a451fe-5cbc-4248-940d-96cf974949b8","target":"card_5a49f55e-f8e1-43c9-a4b0-62d98a921edf"},{"source":"card_96738337-68a2-44f4-8045-acf4de6f86fb","target":"card_13a3dd8b-2690-46ff-ac35-47f54b7e1562"},{"source":"card_1b419bb2-0165-4227-a943-eafd527caca8","target":"card_357f8c21-e05a-4889-9990-6bc79190f923"},{"source":"card_ee78b1cf-19a5-4870-aa97-d79cdb247427","target":"card_b0c784da-8372-4e41-8ee5-4d8f5a6165fb"},{"source":"card_a6c2fa37-4fe7-4b10-8bee-09d68680473b","target":"card_5e9c0598-2319-40cc-a908-79a45884dce0"},{"source":"card_e4b92fc8-876f-4f83-beb5-176daff016b4","target":"card_696820bd-6f5a-4117-9017-7007102f4ff7"},{"source":"card_696820bd-6f5a-4117-9017-7007102f4ff7","target":"card_69fab1f7-50fb-43a5-9d61-2467d200d218"},{"source":"card_69fab1f7-50fb-43a5-9d61-2467d200d218","target":"card_f504de0a-753e-430f-a428-e461dd507d20"},{"source":"card_0e1d6d59-11b4-4e67-84b7-2d8d3fec188c","target":"card_92dbd4e8-d07f-4f6c-881c-48495385998b"},{"source":"card_92dbd4e8-d07f-4f6c-881c-48495385998b","target":"card_884b9e4d-c508-4d90-ba80-4ff010aeff67"},{"source":"card_7db167b5-11a4-47ef-ae52-1d8aba670f90","target":"card_d53ebfc3-9d77-4d61-9d6a-b746da073866"},{"source":"card_58a04f8a-b25f-4b30-a599-e1f2a6e7def0","target":"card_22e026a7-a767-45f3-aae0-15c4e28a38c7"},{"source":"card_e3d7c3dd-e99a-4f58-86be-ea7346dbee08","target":"card_f6eac9b9-4666-4f97-925d-970e3815aa11"},{"source":"card_c3a385dd-25e9-468e-a117-3c98fe07bac1","target":"card_255d0f2f-49c8-4f48-8d34-c89cde7fa87f"},{"source":"card_7fbad783-ec36-4541-8233-754830bdac38","target":"card_591c0d5f-07bd-4b0c-ab6d-16c967195ab2"},{"source":"card_591c0d5f-07bd-4b0c-ab6d-16c967195ab2","target":"card_e196c5db-680f-4c5f-b47f-1b9375fae653"},{"source":"card_08998815-d3be-4fb6-b435-2a5d54866996","target":"card_e51ec144-3bc0-4091-9f4c-d136f7ade6bf"},{"source":"card_bd2bf420-5d6e-479e-99f4-328eac3bca49","target":"card_a4a1b2d9-2f20-4100-9cc6-4c6a26d9e940"},{"source":"card_fdb0ade6-b97a-4f64-afdc-ac3fc69d6316","target":"card_d29071c3-884f-4bb8-822a-2be06491585e"},{"source":"card_facd42c9-da71-407d-8b93-254c41039cdc","target":"card_19d50286-6bd9-4f06-a144-724bd22948e9"},{"source":"card_19d50286-6bd9-4f06-a144-724bd22948e9","target":"card_012925cd-7594-42da-9c90-ab5a5d94a68c"},{"source":"card_b6404706-86de-4f17-897c-fe56fd032e5d","target":"card_7f509ace-4375-49af-a8f7-230274d5600e"},{"source":"card_74d011d0-0c7e-4296-a367-4023571d04f0","target":"card_144ec931-7397-480b-a1ea-e72f0381139b"},{"source":"card_949b3140-207f-4afe-908e-98b33b03d920","target":"card_8e63c6f5-5f59-4b01-82ff-4619c28b24c7"},{"source":"card_c3ec1777-7d61-4dd5-b812-acb45eba4246","target":"card_293b0f9b-f0f9-44f3-97fa-8a2f6a5b2880"},{"source":"card_76a1975e-d525-4bf1-be3e-06b21e94a3b6","target":"card_e981d93f-8cea-41de-8d3d-97c0259f7a6a"},{"source":"card_41808fd9-cc50-4e85-b703-6a19b4d0de76","target":"card_fafdf22b-ffc5-4bd2-96d9-5bc12f220f60"},{"source":"card_eb59dc27-17fe-489c-a191-f5cd3bd7fd71","target":"card_191f1bae-650f-4388-9dbd-513ae2465155"},{"source":"card_852eb438-9427-44af-82b2-e2eb2421ef91","target":"card_a688251b-4251-47e8-924d-2fca19789bb5"},{"source":"card_f407e3c5-169a-4b7d-9778-111e6f2735cb","target":"card_ab20ee2d-6f22-4d74-9220-3019cb4b68e9"},{"source":"card_28c505e0-a7cd-4d6b-81f4-a08a6ba8ae53","target":"card_8d2a24ff-2ddc-4e01-a713-7f35e5e196e0"},{"source":"card_313a6914-262f-4865-b12e-7a4a4898c25a","target":"card_326c72bd-3b0c-465e-8744-02bb6f515316"},{"source":"card_b44f20ff-67e5-424f-bba6-e16be58727a8","target":"card_da1c1d01-1ec1-4320-9098-1dcfdb3b3fe2"},{"source":"card_c3db95a3-6278-40e2-88ef-3a711ec58a53","target":"card_90fc2a36-e7d3-463b-8c91-3955be97beb0"},{"source":"card_d8e1ef5e-da70-46e8-a970-eb91f6e96fb2","target":"card_1bd24f3d-32e1-4d47-82d7-9fb55e389a92"},{"source":"card_94ffc464-185a-4815-b516-d0978d172895","target":"card_ea92fb38-5955-46e8-b198-2259dfa24f34"},{"source":"card_36a1e45b-c1ae-4c3f-ac33-ab389fd6064e","target":"card_27ded542-cd74-42dd-aea0-4fea67c14e62"},{"source":"card_7b41450d-8751-450c-b4f4-22dcbdb8fdec","target":"card_53f0d29b-6e6e-46c6-a9ae-0bd5f041173a"},{"source":"card_6c49c93a-e443-4e26-8ad0-9cb3bb871265","target":"card_d97b0fbc-f673-4bbc-9df3-1c90ce356e42"},{"source":"card_3b1d55ce-dc93-4443-b766-70470161a044","target":"card_261b7a74-2202-4bed-88c5-af15b1e8dc7c"},{"source":"card_e98f6590-b452-4671-904b-f52f5570ff62","target":"card_430c11df-23e5-4f5d-a555-23bb96c278f9"},{"source":"card_b0a4fa6e-8b38-431d-9d33-5eb690355bd6","target":"card_830e91be-f88a-47ad-9243-130e31757652"},{"source":"card_830e91be-f88a-47ad-9243-130e31757652","target":"card_24979305-86e3-441a-8ea9-35848ca85f12"},{"source":"card_feb40fbe-7834-4bb6-9c29-90a077fedd49","target":"card_5155a7d1-c839-44b5-9f5b-b6c74eb5c809"},{"source":"card_b840d861-8168-4941-b407-f1d2bf03bdb6","target":"card_42a7a9dd-1e5d-4d23-81b5-cff916d6891b"},{"source":"card_42a7a9dd-1e5d-4d23-81b5-cff916d6891b","target":"card_cdb29609-e69b-42c9-8e89-47a3cf6bdd1a"},{"source":"card_cdb29609-e69b-42c9-8e89-47a3cf6bdd1a","target":"card_a2ee8a86-e24c-4425-af84-5f735c4333ad"},{"source":"card_2b2e6374-cda1-4a72-a617-88edb95d81a4","target":"card_8cb398ba-4f47-4c08-b3bf-778f171f6075"},{"source":"card_f753048a-e7a3-4f13-9329-6779418b7ed6","target":"card_90c1431c-c8c8-458b-93dd-c3fb400421ec"},{"source":"card_9839ed1a-7750-46a7-a73d-8117837d5c60","target":"card_dc5f7b1e-6b41-43fe-8e9c-64d72edbee40"},{"source":"card_7146d657-69dc-42cc-b684-9f92913dacb6","target":"card_cbe1ddc5-5a0d-498b-b750-264d216c2279"},{"source":"card_6a2c511d-5d75-4df0-9565-131d15621af1","target":"card_67b8ed1a-7653-41d8-bc2f-c09932f2ee49"},{"source":"card_2df02546-bca5-4f80-bb18-73b7fc7cf07d","target":"card_da18bcd6-f922-40a2-ba70-8c9f5e1f110e"},{"source":"card_17c7ba79-e62a-45f5-960c-0f9ef2a8b989","target":"card_43c8e3bf-379e-43dc-b649-d9bd1482e0f3"},{"source":"card_43c8e3bf-379e-43dc-b649-d9bd1482e0f3","target":"card_b7116bf7-ffde-49c4-9a1b-2c1bf816031e"},{"source":"card_b7116bf7-ffde-49c4-9a1b-2c1bf816031e","target":"card_5c6205f0-2501-45e2-8f0d-96e68a5e0e72"},{"source":"card_6b50c0e6-bc5f-41bc-b66f-95aff91e7066","target":"card_28ecb228-2c98-4217-b772-bee8253821a7"},{"source":"card_28ecb228-2c98-4217-b772-bee8253821a7","target":"card_cfaae758-01ef-4b5c-a7e9-b798c32209a2"},{"source":"card_cfaae758-01ef-4b5c-a7e9-b798c32209a2","target":"card_bb569760-f14f-4dfd-9cb6-8f5c57dce22f"},{"source":"card_bb569760-f14f-4dfd-9cb6-8f5c57dce22f","target":"card_d762926e-74ce-4f50-9350-5913ad2a2b52"},{"source":"card_d762926e-74ce-4f50-9350-5913ad2a2b52","target":"card_46ef9141-4d7f-46d8-a353-0e27b89cbd8a"},{"source":"card_46ef9141-4d7f-46d8-a353-0e27b89cbd8a","target":"card_68d2098f-8214-41a1-b290-4b6122fa8ea3"},{"source":"card_68d2098f-8214-41a1-b290-4b6122fa8ea3","target":"card_6cec9aa5-f373-48d3-81bc-1141e90893ff"},{"source":"card_a57e1c82-0b3f-40f8-abd3-1aa4b428acc2","target":"card_2cab0f7b-1451-4d19-8ab5-4a9adaf10f6a"},{"source":"card_2cab0f7b-1451-4d19-8ab5-4a9adaf10f6a","target":"card_b084bba7-8e47-47e0-b421-8721e707ea61"},{"source":"card_b084bba7-8e47-47e0-b421-8721e707ea61","target":"card_e75e446a-4230-41d6-a6f1-b512dbff0989"},{"source":"card_6eb5e909-2045-47d6-ac2c-8c785e969807","target":"card_824faa7e-356c-4226-a601-d2fbbd936814"},{"source":"card_824faa7e-356c-4226-a601-d2fbbd936814","target":"card_97790d4b-aea7-4d40-90b0-91a74b90730f"},{"source":"card_97790d4b-aea7-4d40-90b0-91a74b90730f","target":"card_bb5a6f8e-0272-4064-9405-7901dce2adfa"},{"source":"card_bb5a6f8e-0272-4064-9405-7901dce2adfa","target":"card_895b6d26-1a7b-4261-b89e-b655f4179507"},{"source":"card_895b6d26-1a7b-4261-b89e-b655f4179507","target":"card_d8e4610d-7263-4903-91d7-fa3ab5ce0a87"},{"source":"card_d8e4610d-7263-4903-91d7-fa3ab5ce0a87","target":"card_4bf57722-d29c-4018-9862-87e52a735b65"},{"source":"card_4bf57722-d29c-4018-9862-87e52a735b65","target":"card_c54d870e-e47c-47a0-b3db-794e4d99bf4e"},{"source":"card_c54d870e-e47c-47a0-b3db-794e4d99bf4e","target":"card_39e5204e-5350-4c68-baac-a4cd85b381ad"},{"source":"card_39e5204e-5350-4c68-baac-a4cd85b381ad","target":"card_93a6a027-7dbc-4932-8406-1f4d4a344ff7"},{"source":"card_93a6a027-7dbc-4932-8406-1f4d4a344ff7","target":"card_e8b387af-2aaa-491d-9a1e-a2ba941293a3"},
      {"source":"card_e8b387af-2aaa-491d-9a1e-a2ba941293a3","target":"card_ad344e7e-3952-49dc-aaf8-82b3b9711c70"},{"source":"card_6422383f-3c1e-454c-887b-351def05e31e","target":"card_50d73384-379a-4919-8b9a-f183efc4990e"},{"source":"card_50d73384-379a-4919-8b9a-f183efc4990e","target":"card_c9803688-4558-4369-bc91-f24b9da46aa4"},{"source":"card_c9803688-4558-4369-bc91-f24b9da46aa4","target":"card_5bc2485f-5b18-43a8-abea-4387cd07d097"},{"source":"card_5bc2485f-5b18-43a8-abea-4387cd07d097","target":"card_ef645e66-a4b4-4768-a5fd-4aa368ecacf1"},{"source":"card_ef645e66-a4b4-4768-a5fd-4aa368ecacf1","target":"card_85bc386c-3414-462c-953b-3ba89236f872"},{"source":"card_85bc386c-3414-462c-953b-3ba89236f872","target":"card_f21f82a7-d1a3-4253-8a24-1c226be823be"},{"source":"card_f21f82a7-d1a3-4253-8a24-1c226be823be","target":"card_241b60a9-4d60-422d-a4e8-65795f0af998"},{"source":"card_241b60a9-4d60-422d-a4e8-65795f0af998","target":"card_088dfb05-6b0e-4323-a91c-4c1f61fd1de3"},{"source":"card_b01b3c1d-2e78-4201-bc73-0bf106442bb2","target":"card_320e2705-f513-44ca-b8df-ebd308c8abed"},{"source":"card_320e2705-f513-44ca-b8df-ebd308c8abed","target":"card_6cfb00c9-c2c8-4cf4-abf4-bd95a5c38437"},{"source":"card_6cfb00c9-c2c8-4cf4-abf4-bd95a5c38437","target":"card_c3f4ee1a-ae56-438d-8dd5-41129c55fad6"},{"source":"card_c3f4ee1a-ae56-438d-8dd5-41129c55fad6","target":"card_e2b19055-7194-41c9-a8e4-512d8b5f0666"},{"source":"card_e2b19055-7194-41c9-a8e4-512d8b5f0666","target":"card_db7c690a-4ec6-4076-992c-49f52c23ceb3"},{"source":"card_db7c690a-4ec6-4076-992c-49f52c23ceb3","target":"card_93e12e33-682b-4b44-bf80-1e3ea6070f62"},{"source":"card_93e12e33-682b-4b44-bf80-1e3ea6070f62","target":"card_8df4f093-ce91-4dbc-8034-9043a00a09a3"},{"source":"card_8df4f093-ce91-4dbc-8034-9043a00a09a3","target":"card_c3cf047a-9f9d-4e35-9870-8b82d70bc822"},{"source":"card_a1132173-7e89-40fc-8a57-9e6b21a99920","target":"card_00022e8f-d1a0-49a8-95c8-c2341ed02d43"},{"source":"card_00022e8f-d1a0-49a8-95c8-c2341ed02d43","target":"card_2e494fa4-cce0-438f-bdcf-564d608779c8"},{"source":"card_2e494fa4-cce0-438f-bdcf-564d608779c8","target":"card_61b65e03-bba3-4f25-81ec-fb71fbdb4579"},{"source":"card_61b65e03-bba3-4f25-81ec-fb71fbdb4579","target":"card_e575ec19-b12c-47f8-9cc4-01c8b106f30b"},{"source":"card_e575ec19-b12c-47f8-9cc4-01c8b106f30b","target":"card_81f96802-cda9-42a7-9d0b-69bca552dacf"},{"source":"card_81f96802-cda9-42a7-9d0b-69bca552dacf","target":"card_520fc4aa-269b-4b67-a6c8-9606ada34201"},{"source":"card_520fc4aa-269b-4b67-a6c8-9606ada34201","target":"card_6232a83f-9f76-4067-b9dd-409eae6e0dc5"},{"source":"card_6232a83f-9f76-4067-b9dd-409eae6e0dc5","target":"card_18026d4e-5a1c-4862-93ce-5ed107d8ca42"},{"source":"card_18026d4e-5a1c-4862-93ce-5ed107d8ca42","target":"card_2b9c90c2-5c0f-477c-a1db-715d884a46c0"},{"source":"card_2b9c90c2-5c0f-477c-a1db-715d884a46c0","target":"card_22a95e1a-0d95-4fcb-9bce-606e53e6ddb3"},{"source":"card_22a95e1a-0d95-4fcb-9bce-606e53e6ddb3","target":"card_aa1d57d6-54d8-4da4-b801-42330c614021"},{"source":"card_aa1d57d6-54d8-4da4-b801-42330c614021","target":"card_25aa56fe-3be9-4f35-ac2e-31006bcf8b26"},{"source":"card_25aa56fe-3be9-4f35-ac2e-31006bcf8b26","target":"card_db393107-490b-4b47-8f4f-fb4474ac5d5b"},{"source":"card_db393107-490b-4b47-8f4f-fb4474ac5d5b","target":"card_8b427c1d-504a-4e5e-a4f3-7552ac5c2904"},{"source":"card_8b427c1d-504a-4e5e-a4f3-7552ac5c2904","target":"card_bcff2a7f-fdc5-4c21-a07e-7d57f13d9666"},{"source":"card_bcff2a7f-fdc5-4c21-a07e-7d57f13d9666","target":"card_37158540-830e-460f-9a69-e43e0cfe07e2"},{"source":"card_37158540-830e-460f-9a69-e43e0cfe07e2","target":"card_c3d3d3bd-fed4-43f5-aecd-533f107402ca"},{"source":"card_c3d3d3bd-fed4-43f5-aecd-533f107402ca","target":"card_11955fca-6f48-403f-a7ec-e2002aeb6377"},{"source":"card_11955fca-6f48-403f-a7ec-e2002aeb6377","target":"card_31af88d6-ec8f-475b-9dba-763527e58676"},{"source":"card_31af88d6-ec8f-475b-9dba-763527e58676","target":"card_bef0d4ec-25f7-400f-a3e3-ebfe20665dbe"},{"source":"card_bef0d4ec-25f7-400f-a3e3-ebfe20665dbe","target":"card_932bed29-b0d9-423a-a79e-8aeb99917fb0"},{"source":"card_932bed29-b0d9-423a-a79e-8aeb99917fb0","target":"card_1da8a6f3-ea7a-4a3c-b004-c6682a0464c5"},{"source":"card_1da8a6f3-ea7a-4a3c-b004-c6682a0464c5","target":"card_8028d9df-0167-4224-85fc-6495eeb51b76"},{"source":"card_8028d9df-0167-4224-85fc-6495eeb51b76","target":"card_38e55514-3673-4b00-8c41-edcedecc875f"},{"source":"card_38e55514-3673-4b00-8c41-edcedecc875f","target":"card_bc15fad8-b521-4e23-93c9-69ae3d839d8f"},{"source":"card_bc15fad8-b521-4e23-93c9-69ae3d839d8f","target":"card_9da280d6-98c7-4e16-9f86-eef92d7e3968"},{"source":"card_9da280d6-98c7-4e16-9f86-eef92d7e3968","target":"card_032a7daa-03f9-423b-a600-f65534921d35"},{"source":"card_032a7daa-03f9-423b-a600-f65534921d35","target":"card_c5534de3-da27-40c5-bff7-1f4bad7be79b"},{"source":"card_c5534de3-da27-40c5-bff7-1f4bad7be79b","target":"card_a39d8419-9817-4a49-b528-ee66579898b8"},{"source":"card_88e4657e-9167-4c54-a4cd-31f3c5056d2a","target":"card_5d2ccad1-0f81-4c33-9006-e570ccd0624d"},{"source":"card_5d2ccad1-0f81-4c33-9006-e570ccd0624d","target":"card_13acd88d-0fb7-4adb-81ca-ff7ca9ff9cae"},{"source":"card_13acd88d-0fb7-4adb-81ca-ff7ca9ff9cae","target":"card_e58876e2-638e-4fae-a227-27ffba2ec482"},{"source":"card_c4dbea56-f0ff-46be-8222-c92e1daa92e8","target":"card_a744df8e-8c76-4ca9-884f-48dc9d646f22"},{"source":"card_a744df8e-8c76-4ca9-884f-48dc9d646f22","target":"card_ee93fccf-2cb5-40c8-a8a5-aa0269d2a1c1"},{"source":"card_ee93fccf-2cb5-40c8-a8a5-aa0269d2a1c1","target":"card_1c8e65f5-64dc-4a72-a6c0-4655897fdf99"},{"source":"card_1c8e65f5-64dc-4a72-a6c0-4655897fdf99","target":"card_429a3e80-e0dd-445a-a7ad-5f835df6f9d6"},{"source":"card_429a3e80-e0dd-445a-a7ad-5f835df6f9d6","target":"card_d3df2271-f5ca-4a35-83fe-40efcab528cb"},{"source":"card_d3df2271-f5ca-4a35-83fe-40efcab528cb","target":"card_c98a9838-cbed-4075-9202-5e6f8de61b19"},{"source":"card_c98a9838-cbed-4075-9202-5e6f8de61b19","target":"card_8c65fa53-417f-4077-b0cc-a6619ce08ba4"},{"source":"card_8c65fa53-417f-4077-b0cc-a6619ce08ba4","target":"card_95e3f42a-603b-4c84-8f77-e5ca4c2a0819"},{"source":"card_95e3f42a-603b-4c84-8f77-e5ca4c2a0819","target":"card_4f9c559d-4cff-4a9c-a4d4-88bb83d73062"},{"source":"card_a37868bc-b2a8-4957-b8f8-3f632bf5f741","target":"card_db8ae26c-3bb4-4b8c-9dea-fb1cf02afcfa"},{"source":"card_db8ae26c-3bb4-4b8c-9dea-fb1cf02afcfa","target":"card_b6e59e15-81f5-492d-947e-7a84ece3b12d"},{"source":"card_b6e59e15-81f5-492d-947e-7a84ece3b12d","target":"card_1b86644a-c979-4cce-974c-ad064d4c216c"},{"source":"card_1e5eb683-3cf0-4427-bb7e-920c9a018cd8","target":"card_3cb8b6c4-230d-40af-afae-e7a40514e33b"},{"source":"card_3cb8b6c4-230d-40af-afae-e7a40514e33b","target":"card_4f58f183-c5b6-4254-843b-aa4272ec43f6"},{"source":"card_4f58f183-c5b6-4254-843b-aa4272ec43f6","target":"card_44eb5cd2-241b-43ef-ab0b-1689f24819dc"},{"source":"card_44eb5cd2-241b-43ef-ab0b-1689f24819dc","target":"card_54ffe528-782d-4242-ac44-7e966be8080d"},{"source":"card_54ffe528-782d-4242-ac44-7e966be8080d","target":"card_4cb0d96e-f9df-4c77-a9e2-942f0283f32b"},{"source":"card_4cb0d96e-f9df-4c77-a9e2-942f0283f32b","target":"card_6c408073-ed42-4a71-afa0-07f556830b37"},{"source":"card_6c408073-ed42-4a71-afa0-07f556830b37","target":"card_e7b80ecf-c228-431d-ad31-3424d59844b6"},{"source":"card_e7b80ecf-c228-431d-ad31-3424d59844b6","target":"card_8f0d96ee-0add-471d-bd6c-40a596583c16"},{"source":"card_aa02875e-e2d3-4647-8497-4fd40098e09d","target":"card_857d3494-7d48-4afc-9413-47052e955c58"},{"source":"card_857d3494-7d48-4afc-9413-47052e955c58","target":"card_1ffff853-be4c-41b0-8d08-28cfcd62a14a"},{"source":"card_1ffff853-be4c-41b0-8d08-28cfcd62a14a","target":"card_baf47540-4844-456b-a59b-892f8f3485ad"},{"source":"card_ded33c30-47e4-42b1-a1fe-0a0a7e11dc08","target":"card_a96a160b-57b1-4fd1-94df-204b82ccb3ae"},{"source":"card_a96a160b-57b1-4fd1-94df-204b82ccb3ae","target":"card_475e8f83-addd-4872-bac9-d0eda5cabd96"},{"source":"card_475e8f83-addd-4872-bac9-d0eda5cabd96","target":"card_b3b621e7-2fc0-4503-b3d8-bbdd65ede0cb"},{"source":"card_b3b621e7-2fc0-4503-b3d8-bbdd65ede0cb","target":"card_d7aa7e87-5061-4ee3-8d36-239493bcc928"},{"source":"card_d7aa7e87-5061-4ee3-8d36-239493bcc928","target":"card_9b5a6c20-6e2d-4467-8a58-9b0dd20f30ec"},{"source":"card_9b5a6c20-6e2d-4467-8a58-9b0dd20f30ec","target":"card_1af6fb15-3d84-40b4-8082-503e5062cdf2"},{"source":"card_1af6fb15-3d84-40b4-8082-503e5062cdf2","target":"card_8537f2c7-5da8-42a8-b8d6-52973c6424ae"},{"source":"card_8537f2c7-5da8-42a8-b8d6-52973c6424ae","target":"card_ab96c0bf-a34a-49d1-96ac-8a2510c7d79d"},{"source":"card_ab96c0bf-a34a-49d1-96ac-8a2510c7d79d","target":"card_e0297859-97ac-4e20-a652-b6b6c80d6bd2"},{"source":"card_e0297859-97ac-4e20-a652-b6b6c80d6bd2","target":"card_868d1ab7-145d-4360-a803-b62415bdf20d"},{"source":"card_868d1ab7-145d-4360-a803-b62415bdf20d","target":"card_66504c9f-2f9f-4177-a0f3-d0578af16566"},{"source":"card_953560ce-ec8f-40cf-8997-8d7a22224951","target":"card_a245b44c-cccb-4ae5-9641-4387316b1540"},{"source":"card_a245b44c-cccb-4ae5-9641-4387316b1540","target":"card_9c4fac0e-e806-4908-a6f0-bb434bf235d8"},{"source":"card_9c4fac0e-e806-4908-a6f0-bb434bf235d8","target":"card_4c58065d-a21d-4060-8aad-6d7b41987186"},{"source":"card_d9b9b1b8-3d83-4500-8aa3-0ab1fd360586","target":"card_5e7c04c0-cce7-42ec-b49d-861f920de834"},{"source":"card_5e7c04c0-cce7-42ec-b49d-861f920de834","target":"card_0f103cb6-50af-48cf-a067-cfc21e32e831"},{"source":"card_0f103cb6-50af-48cf-a067-cfc21e32e831","target":"card_52520355-9249-434c-9de8-68169d388ad0"},{"source":"card_52520355-9249-434c-9de8-68169d388ad0","target":"card_a5b26216-5b35-44ae-9d37-7d5603e9ff2b"},{"source":"card_a5b26216-5b35-44ae-9d37-7d5603e9ff2b","target":"card_7058b457-f91c-4340-a1c5-650ebf8facb3"},{"source":"card_89f6cbca-f66a-4e36-bf7b-4053be55f741","target":"card_1c577df9-5d61-4e9a-ad0b-a58091db46de"},{"source":"card_1c577df9-5d61-4e9a-ad0b-a58091db46de",
      "target":"card_2e1c885a-604f-4588-b6e9-a405f1478480"},{"source":"card_2e1c885a-604f-4588-b6e9-a405f1478480","target":"card_9f55a1ba-5b5e-48d1-98cd-7d29c11fdf2d"},{"source":"card_9f55a1ba-5b5e-48d1-98cd-7d29c11fdf2d","target":"card_545f2a16-661a-4074-ac6f-246853b2106f"},{"source":"card_545f2a16-661a-4074-ac6f-246853b2106f","target":"card_f1553c0f-321e-441b-9513-74914f49ea59"},{"source":"card_d60a26aa-bb21-4035-ba8e-150665728bee","target":"card_3d948621-ab70-4752-be52-c4a0752685e5"},{"source":"card_3d948621-ab70-4752-be52-c4a0752685e5","target":"card_f46f9372-36cb-4bd6-86d0-b5997e43d595"},{"source":"card_9038dcda-6758-4f70-9be0-bb8792cb97fb","target":"card_bb14a292-be1c-49eb-89a9-ef6ca7ac364e"},{"source":"card_bb14a292-be1c-49eb-89a9-ef6ca7ac364e","target":"card_71fe67aa-90fc-44f6-9dc3-434322281991"},{"source":"card_71fe67aa-90fc-44f6-9dc3-434322281991","target":"card_182b03a4-206c-4f4c-8bdf-a4516dbc8b8b"},{"source":"card_182b03a4-206c-4f4c-8bdf-a4516dbc8b8b","target":"card_187be35d-6c10-49eb-9aa3-6c6f284f36a3"},{"source":"card_187be35d-6c10-49eb-9aa3-6c6f284f36a3","target":"card_3db7a605-851e-48fc-8e17-14b2f5ed4446"},{"source":"card_3db7a605-851e-48fc-8e17-14b2f5ed4446","target":"card_c39b2bfc-d0cc-4bfa-a06c-580a916ede1e"},{"source":"card_c39b2bfc-d0cc-4bfa-a06c-580a916ede1e","target":"card_8b10fde2-20db-4d80-977b-04a1e47adfd8"},{"source":"card_93193de4-1616-44f4-b3cb-74ba589082a2","target":"card_3bdcc90c-04df-4b61-8e3b-0c8bba6eeb7e"},{"source":"card_3bdcc90c-04df-4b61-8e3b-0c8bba6eeb7e","target":"card_7eb6b2fc-ac77-4ae3-979e-3df81cea6269"},{"source":"card_7eb6b2fc-ac77-4ae3-979e-3df81cea6269","target":"card_d8ef93ec-6a56-4244-a8a3-43dd33182bda"},{"source":"card_d8ef93ec-6a56-4244-a8a3-43dd33182bda","target":"card_8e120256-6aec-4e94-ac1b-6d3cbece40b5"},{"source":"card_8e120256-6aec-4e94-ac1b-6d3cbece40b5","target":"card_248b4916-5d41-4eb0-8831-b57ef8f00fcb"},{"source":"card_050d4cc4-664a-4c23-a0c4-7d62bb6965e3","target":"card_16f6d732-46ff-4e05-99ef-ec5f6c99c40e"},{"source":"card_16f6d732-46ff-4e05-99ef-ec5f6c99c40e","target":"card_821bb35f-9b71-46f1-990f-23cde8f6dd72"},{"source":"card_821bb35f-9b71-46f1-990f-23cde8f6dd72","target":"card_ca056ccf-d1e3-43a6-8b95-7e1f91c17c28"},{"source":"card_ca056ccf-d1e3-43a6-8b95-7e1f91c17c28","target":"card_be37ee6f-220f-46db-bc18-ea602ae86be4"},{"source":"card_be37ee6f-220f-46db-bc18-ea602ae86be4","target":"card_b069bce1-3412-4ba2-8155-1bf56553c056"},{"source":"card_b069bce1-3412-4ba2-8155-1bf56553c056","target":"card_1c7702e1-ac28-4388-b906-0b1ce4cd293a"},{"source":"card_1c7702e1-ac28-4388-b906-0b1ce4cd293a","target":"card_d2145e21-8af0-42c1-bc62-f5de72172e59"},{"source":"card_d2145e21-8af0-42c1-bc62-f5de72172e59","target":"card_784b3dbd-3dc9-4f26-ad1e-606715666b0e"},{"source":"card_784b3dbd-3dc9-4f26-ad1e-606715666b0e","target":"card_de6d3f80-3d55-4ccf-be03-7537c8afe39e"},{"source":"card_1600fadd-e8f6-43d6-8c10-af3ba3410c60","target":"card_4b7b80fe-806e-4b8e-a58b-40b1af0fc250"},{"source":"card_4b7b80fe-806e-4b8e-a58b-40b1af0fc250","target":"card_8009e075-8f5f-4079-a4a5-93e2596aa7eb"},{"source":"card_8009e075-8f5f-4079-a4a5-93e2596aa7eb","target":"card_bf9b856f-6da8-4154-a0c6-c34f17b1fa15"},{"source":"card_bf9b856f-6da8-4154-a0c6-c34f17b1fa15","target":"card_a082b679-4469-439b-a20b-a16e70f870b2"},{"source":"card_a082b679-4469-439b-a20b-a16e70f870b2","target":"card_c338bc8f-2cd0-4668-9e90-487dfd3579b4"},{"source":"card_c338bc8f-2cd0-4668-9e90-487dfd3579b4","target":"card_5e17d595-e644-45ba-9e9c-ce1767346225"},{"source":"card_3daf5b4e-32bd-4105-beae-1f07e83368ea","target":"card_c2c90ba2-0e9a-4c41-918a-c4a98377c407"},{"source":"card_c2c90ba2-0e9a-4c41-918a-c4a98377c407","target":"card_7850f45f-bf7c-46cc-b640-0b0bebeed1b7"},{"source":"card_7850f45f-bf7c-46cc-b640-0b0bebeed1b7","target":"card_aa136779-b538-47d3-9d45-ba3f3788c024"},{"source":"card_aa136779-b538-47d3-9d45-ba3f3788c024","target":"card_a64f9ee2-7dc9-4fb2-a3e5-3b11aa865742"}
    ],
    instance: null,
    meta: "Thanks to <a href='https://www.officialhacksandwonks.com/sse-37th-ld-debate-2022#transcript'>Hacks and Wonks</a> for conducting the forum and releasing the transcript",
    selectedNode: null,
    selectedTags: [],
    shouldCenterOnActive: false,
    speeches: ['Speech 1'],
    speechId: 0,
    speechNodes: [],
    speechYPosition: 0,
    status: 'navigating',
    tags: {"disagreement":["card_96738337-68a2-44f4-8045-acf4de6f86fb","card_a6c2fa37-4fe7-4b10-8bee-09d68680473b","card_7db167b5-11a4-47ef-ae52-1d8aba670f90","card_852eb438-9427-44af-82b2-e2eb2421ef91","card_313a6914-262f-4865-b12e-7a4a4898c25a","card_b44f20ff-67e5-424f-bba6-e16be58727a8","card_7b41450d-8751-450c-b4f4-22dcbdb8fdec","card_6c49c93a-e443-4e26-8ad0-9cb3bb871265","card_a1132173-7e89-40fc-8a57-9e6b21a99920"],"moderator":["card_6033845d-8a34-4b39-ada7-e294e3417060",null,"card_3daf5b4e-32bd-4105-beae-1f07e83368ea"],"bio":["card_b3edf959-65c2-4ed3-84fe-a37cb572ff9b","card_e4b92fc8-876f-4f83-beb5-176daff016b4","card_0e1d6d59-11b4-4e67-84b7-2d8d3fec188c","card_7db167b5-11a4-47ef-ae52-1d8aba670f90","card_313a6914-262f-4865-b12e-7a4a4898c25a","card_b44f20ff-67e5-424f-bba6-e16be58727a8","card_7b41450d-8751-450c-b4f4-22dcbdb8fdec","card_6c49c93a-e443-4e26-8ad0-9cb3bb871265","card_6c49c93a-e443-4e26-8ad0-9cb3bb871265","card_6c49c93a-e443-4e26-8ad0-9cb3bb871265","card_3b1d55ce-dc93-4443-b766-70470161a044","card_e98f6590-b452-4671-904b-f52f5570ff62","card_b0a4fa6e-8b38-431d-9d33-5eb690355bd6","card_feb40fbe-7834-4bb6-9c29-90a077fedd49","card_b840d861-8168-4941-b407-f1d2bf03bdb6","card_2b2e6374-cda1-4a72-a617-88edb95d81a4","card_9839ed1a-7750-46a7-a73d-8117837d5c60","card_7146d657-69dc-42cc-b684-9f92913dacb6","card_6a2c511d-5d75-4df0-9565-131d15621af1","card_2df02546-bca5-4f80-bb18-73b7fc7cf07d","card_a1132173-7e89-40fc-8a57-9e6b21a99920","card_aa02875e-e2d3-4647-8497-4fd40098e09d","card_ded33c30-47e4-42b1-a1fe-0a0a7e11dc08","card_9038dcda-6758-4f70-9be0-bb8792cb97fb","card_1600fadd-e8f6-43d6-8c10-af3ba3410c60"],"housing":["card_a5a451fe-5cbc-4248-940d-96cf974949b8","card_96738337-68a2-44f4-8045-acf4de6f86fb","card_1b419bb2-0165-4227-a943-eafd527caca8","card_ee78b1cf-19a5-4870-aa97-d79cdb247427","card_a6c2fa37-4fe7-4b10-8bee-09d68680473b","card_e4b92fc8-876f-4f83-beb5-176daff016b4","card_0e1d6d59-11b4-4e67-84b7-2d8d3fec188c","card_7db167b5-11a4-47ef-ae52-1d8aba670f90","card_88e4657e-9167-4c54-a4cd-31f3c5056d2a"],"crime":["card_58a04f8a-b25f-4b30-a599-e1f2a6e7def0","card_e3d7c3dd-e99a-4f58-86be-ea7346dbee08","card_c3a385dd-25e9-468e-a117-3c98fe07bac1","card_7fbad783-ec36-4541-8233-754830bdac38","card_08998815-d3be-4fb6-b435-2a5d54866996","card_a37868bc-b2a8-4957-b8f8-3f632bf5f741","card_93193de4-1616-44f4-b3cb-74ba589082a2","card_050d4cc4-664a-4c23-a0c4-7d62bb6965e3"],"health care":["card_bd2bf420-5d6e-479e-99f4-328eac3bca49","card_fdb0ade6-b97a-4f64-afdc-ac3fc69d6316","card_b01b3c1d-2e78-4201-bc73-0bf106442bb2"],"education":["card_08998815-d3be-4fb6-b435-2a5d54866996","card_949b3140-207f-4afe-908e-98b33b03d920","card_c3ec1777-7d61-4dd5-b812-acb45eba4246","card_76a1975e-d525-4bf1-be3e-06b21e94a3b6","card_a1132173-7e89-40fc-8a57-9e6b21a99920","card_c4dbea56-f0ff-46be-8222-c92e1daa92e8","card_1e5eb683-3cf0-4427-bb7e-920c9a018cd8"],"gender":["card_facd42c9-da71-407d-8b93-254c41039cdc","card_b6404706-86de-4f17-897c-fe56fd032e5d","card_74d011d0-0c7e-4296-a367-4023571d04f0","card_89f6cbca-f66a-4e36-bf7b-4053be55f741"],"economics":["card_41808fd9-cc50-4e85-b703-6a19b4d0de76","card_eb59dc27-17fe-489c-a191-f5cd3bd7fd71","card_6eb5e909-2045-47d6-ac2c-8c785e969807","card_1e5eb683-3cf0-4427-bb7e-920c9a018cd8"],"transit":["card_852eb438-9427-44af-82b2-e2eb2421ef91","card_f407e3c5-169a-4b7d-9778-111e6f2735cb","card_313a6914-262f-4865-b12e-7a4a4898c25a","card_b44f20ff-67e5-424f-bba6-e16be58727a8","card_17c7ba79-e62a-45f5-960c-0f9ef2a8b989","card_6422383f-3c1e-454c-887b-351def05e31e"],"environment":["card_28c505e0-a7cd-4d6b-81f4-a08a6ba8ae53","card_b01b3c1d-2e78-4201-bc73-0bf106442bb2","card_953560ce-ec8f-40cf-8997-8d7a22224951","card_d9b9b1b8-3d83-4500-8aa3-0ab1fd360586"],"elections":["card_c3db95a3-6278-40e2-88ef-3a711ec58a53","card_d8e1ef5e-da70-46e8-a970-eb91f6e96fb2","card_94ffc464-185a-4815-b516-d0978d172895","card_36a1e45b-c1ae-4c3f-ac33-ab389fd6064e","card_7b41450d-8751-450c-b4f4-22dcbdb8fdec","card_6c49c93a-e443-4e26-8ad0-9cb3bb871265","card_3b1d55ce-dc93-4443-b766-70470161a044","card_e98f6590-b452-4671-904b-f52f5570ff62","card_b0a4fa6e-8b38-431d-9d33-5eb690355bd6","card_feb40fbe-7834-4bb6-9c29-90a077fedd49","card_b840d861-8168-4941-b407-f1d2bf03bdb6","card_d60a26aa-bb21-4035-ba8e-150665728bee"],"labor":["card_2b2e6374-cda1-4a72-a617-88edb95d81a4","card_f753048a-e7a3-4f13-9329-6779418b7ed6","card_9839ed1a-7750-46a7-a73d-8117837d5c60","card_7146d657-69dc-42cc-b684-9f92913dacb6","card_6a2c511d-5d75-4df0-9565-131d15621af1","card_2df02546-bca5-4f80-bb18-73b7fc7cf07d","card_17c7ba79-e62a-45f5-960c-0f9ef2a8b989"],"abortion":["card_6b50c0e6-bc5f-41bc-b66f-95aff91e7066"],"skyway":["card_aa02875e-e2d3-4647-8497-4fd40098e09d"],"Winner: Crystal Fincher":[],"Winner: Emijah Smith":["card_a57e1c82-0b3f-40f8-abd3-1aa4b428acc2"],"Winner: Chipalo Street":["card_a1132173-7e89-40fc-8a57-9e6b21a99920","card_d9b9b1b8-3d83-4500-8aa3-0ab1fd360586"]},
    title: "37th LD, Position 2; October 4, 2022"
  },
  reducers: {
    addCard: (state, action) => {
      state.cards[action.payload.speechId].push(action.payload.card);
      state.cellId += 1;
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    addSpeech: (state, action) => {
      state.speeches.push(action.payload);
    },
    editSpeechTitle: (state, action) => {
      state.speeches[action.payload.speechId] = action.payload.speechName;
    },
    moveUp: (state) => {
      console.log('moving up', state);
      if (state.cellId >= 0) {
        state.cellId -= 1;
      }
    },
    moveDown: (state) => {
      console.log('moving down', state.cards.length, state.cellId);
      if (state.cards.length > state.cellId) {
        state.cellId += 1;
        state.shouldCenterOnActive = true;
      }
    },
    moveLeft: (state) => {
      if (state.speechId > 0) {
        state.speechId -= 1; 
      }
    },
    moveRight: (state) => {
      state.speechId += 1;
      if (state.cards.length <= state.speechId) {
        state.cards.push([]);
        state.speeches.push([`Speech ${state.speeches.length + 1}`]); 
        state.cellId = 0;
      }
    },
    setCards: (state, action) => {
      console.log('setting cards', state, JSON.stringify(action));
      state.cards = action.payload;
    },
    setInstance: (state, action) => {
      console.log('setting instance');
      state.instance = action.payload;
    },
    setSelectedNode: (state, action) => {
      console.log('setting selected node', state, action);
      state.cellId = action.payload;
    },
    setSelectedTags: (state, action) => {
      console.log('setting selected tags', action);
      state.selectedTags = action.payload;
    },
    setSpeechNodes: (state, action) => {
      console.log('setting speech nodes');
      state.speechNodes = action.payload;
    },
    setSpeechYPosition: (state, action) => {
      console.log('setting speech y position');
      state.speechYPosition = action.payload;
    },
    setShouldCenterOnActive: (state, action) => {
      console.log('centering on active?', action.payload);
      state.setShouldCenterOnActive = action.payload;
    },
    setStatus: (state, action) => {
      console.log('setting status');
      state.status = action.payload;
    },
    escapeStatus: (state) => {
      console.log('current status', state.status);
      if (state.status === 'tagging') {
        state.status = 'node';
      }
    },
    addItemToTag: (state, action) => {
      console.log('adding tag', action);
      const { item, tag } = action.payload;
      state.tags[tag].push(item);
    },
    removeTagFromItem: (state, action) => {
      console.log(state.tags, action.payload.tag, action);
      const { item, tag } = action.payload;
      state.tags[tag].splice(state.tags[tag].indexOf(item));
    },
    createTag: (state, action) => {
      console.log('creating tag', action.payload);
      if (Object.keys(state.tags).indexOf(action.payload) == -1) {
        state.tags[action.payload] = [];
      }
      console.log(JSON.stringify(state.tags));
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  addCard,
  addEdge,
  addItemToTag,
  addSpeech,
  createTag,
  editSpeechTitle,
  escapeStatus,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  removeTagFromItem,
  setCards,
  setInstance,
  setSelectedNode,
  setSelectedTags,
  setShouldCenterOnActive,
  setSpeechNodes,
  setSpeechYPosition,
  setStatus
} = flowSlice.actions;

export default flowSlice.reducer;
