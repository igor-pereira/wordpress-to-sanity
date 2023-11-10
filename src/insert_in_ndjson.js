const fs = require('fs')

const technicalSheets = {
  'shopifyProduct-8678478741840': '/uploads/piso_desportivo_1nhrv_STW_ca35a90030.pdf',
  'shopifyProduct-8678480314704': '/uploads/piso_epdm_r_Eeg_J9_ZB_3c96782f7d.pdf',
  'shopifyProduct-8678480445776': '/uploads/piso_sbr_Ntf_U5r8k_acb1c56da3.pdf',
  'shopifyProduct-8678480609616': '/uploads/1302_casinha_torre_m_Lc_Ri_F_Pc_f1b7d60220.pdf',
  'shopifyProduct-8678480675152': '/uploads/1304_casinha_de_brincar_m_O_Esbd_De_d90a1c5339.pdf',
  'shopifyProduct-8678480773456': '/uploads/1306_casinha_de_bonecas_b_Hz1_Sp_S5_eac829dc13.pdf',
  'shopifyProduct-8678480806224': '/uploads/1310_A_Balance_eb14e9c7b5.pdf',
  'shopifyProduct-8678480904528': '/uploads/1321_baloico_duplo_l_Qv03uk3_0b2cf2f5ac.pdf',
  'shopifyProduct-8678480970064': '/uploads/1321a_baloico_simples_5_KU_Zbi_HD_a747d600a6.pdf',
  'shopifyProduct-8678481002832': '/uploads/1330_torre_club_0_W_Va_Dbwc_8ec35c0a82.pdf',
  'shopifyProduct-8678481068368': '/uploads/1330a_torre_pirata_XDS_Wq_O5c_c45aaa21e0.pdf',
  'shopifyProduct-8678481199440': '/uploads/1340_torre_magica_3y3_WCTW_2_f806ce9282.pdf',
  'shopifyProduct-8678481232208': '/uploads/1345_torre_magica_balance_E_Th_Fatyz_23eccf7ce0.pdf',
  'shopifyProduct-8678481297744': '/uploads/1350_torre_odisseia_se_Cm4i_TV_9faab5e3e1.pdf',
  'shopifyProduct-8678481330512': '/uploads/1355_torre_das_descobertas_xn_SS_Ri9m_0474ee336f.pdf',
  'shopifyProduct-8678481396048': '/uploads/1370_torre_boomerang_e_Tsy4mt_V_acb426e52d.pdf',
  'shopifyProduct-8678481527120': '/uploads/2460_bebedouro_z_Bj6_X_Xp_V_8b09679087.pdf',
  'shopifyProduct-8678481756496': '/uploads/2190_Vedacao_em_meios_troncos_c1e33b20c9.pdf',
  'shopifyProduct-8678482313552': '/uploads/circuito_de_manutencao_G514_G8_Be_365a9a1728.pdf',
  'shopifyProduct-8498990874960':
    '/uploads/Mesa_de_refeicao_Sudexpress_2_80m_Pes_T_compressed_14d1b3b726.pdf',
  'shopifyProduct-8499079086416': '/uploads/2054_C_2054_Banco_Pequeno_compressed_cf88b9b3fe.pdf',
  'shopifyProduct-8197991366945': '/uploads/2500_2500_B_Sofa_Brunch_compressed_dce1fa54ef.pdf',
  'shopifyProduct-8063224742177': '/uploads/2520_2520_B_Mesa_Brunch_compressed_f495d5448b.pdf',
  'shopifyProduct-8197991498017':
    '/uploads/2501_2501_B_Cadeira_sem_bracos_compressed_d7c2af0ce1.pdf',
  'shopifyProduct-8197991596321':
    '/uploads/2502_2502_B_Cadeira_com_bracos_compressed_81082d8171.pdf',
  'shopifyProduct-8197991694625':
    '/uploads/2503_2503_B_Banco_Pequeno_Mesa_Apoio_compressed_d04b877908.pdf',
  'shopifyProduct-8197991825697': '/uploads/2504_2504_B_Banco_corrido_compressed_4fbd6b381b.pdf',
  'shopifyProduct-8197991924001': '/uploads/2505_cadeirao_relax_kcux_Cbnu_097f48a72f.pdf',
  'shopifyProduct-8197992186145': '/uploads/2512_sofa_relax_3_lugares_32j9_D_Yb_X_d66f4b47fa.pdf',
  'shopifyProduct-8063224447265':
    '/uploads/2523_mesa_relax_rectangular_tampo_de_vidro_k2a_Lt_Q8d_631756b4e1.pdf',
  'shopifyProduct-8063224512801':
    '/uploads/2522_mesa_relax_de_madeira_hexagonal_Ni2_Spd_LB_8e114d0be8.pdf',
  'shopifyProduct-8063225495841': '/uploads/2506_Cadeira_sem_bracos_compressed_b900fa23d4.pdf',
  'shopifyProduct-8063225463073': '/uploads/2507_Cadeira_com_bracos_compressed_36c73bf97b.pdf',
  'shopifyProduct-8063225430305': '/uploads/2521_Mesa_Country_compressed_4ad87ed363.pdf',
  'shopifyProduct-8063223988513': '/uploads/2531_floreira_relax_hexagonal_p_Bqccui1_af6998c085.pdf',
  'shopifyProduct-8063223955745': '/uploads/2530_floreira_relax_quadrada_Oc7lr_PSD_40b85b52e5.pdf',
  'shopifyProduct-8063224938785':
    '/uploads/Mesa_de_refeicao_Sudexpress_2_80m_Pes_T_compressed_9bedc93e66.pdf',
  'shopifyProduct-8063224840481': '/uploads/2052_C_2052_Banco_2_80_compressed_8635804fe3.pdf',
  'shopifyProduct-8678482575696': '/uploads/2175_floreira_hexagonal_onw_Z0b_Nc_6a01e9c32f.pdf',
  'shopifyProduct-8678482805072': '/uploads/2251_resguardo_de_jardim_3_b2020ac264.pdf',
  'shopifyProduct-8678483132752':
    '/uploads/2187_resguardo_para_contentor_S6_J_Xo_Hzz_90011659ec.pdf',
  'shopifyProduct-8678483296592': '/uploads/2150_floreira_vertical_NKI_1_P_Xz_S_5995be6586.pdf',
  'shopifyProduct-8678483394896': '/uploads/2160_floreira_rectangular_09a6609d00.pdf',
  'shopifyProduct-8678483460432': '/uploads/2170_floreira_quadrada_Yko_Nfwxi_40d1ae8a1b.pdf',
  'shopifyProduct-8678483525968': '/uploads/banco_s_costas_Ffzt_Id_S5_8d8cbee20f.pdf',
  'shopifyProduct-8678483558736':
    '/uploads/2066_banco_sem_costas_com_bracos_PWR_Cm_VSE_3801ea2f55.pdf',
  'shopifyProduct-8678483657040':
    '/uploads/2064_banco_de_jardim_com_costas_KQPV_3_Bam_1e838a9c84.pdf',
  'shopifyProduct-8678483689808': '/uploads/2124_mesa_de_exterior_h_Or0_Q67_X_e3217b9a9b.pdf',
  'shopifyProduct-8678483755344':
    '/uploads/2063_banco_com_bracos_metalicos_e_costas_R1_Qk_TLG_7_ae39ce506d.pdf',
  'shopifyProduct-8678483820880': '/uploads/2069_banco_duplo_com_costas_F12_P_Whee_47e78b7eb6.pdf',
  'shopifyProduct-8678483853648': '/uploads/2068_banco_com_costas_Ncuv_Q_Zxe_5d4fa11cf5.pdf',
  'shopifyProduct-8678483984720': '/uploads/banco_ripado_s_costas_Zs_JTE_Ftb_7ef099fc07.pdf',
  'shopifyProduct-8678484050256':
    '/uploads/2121_mesa_de_madeira_6_pessoas_m_Lrd_T5h8_db8fb4f2fe.pdf',
  'shopifyProduct-8678484115792':
    '/uploads/2072_banco_de_exterior_com_costas_i_J9_Sup_SG_d55fdd8560.pdf',
  'shopifyProduct-8678484148560': '/uploads/banco_de_exterior_s_costas_TLL_2yk_L2_c2f1e6ab41.pdf',
  'shopifyProduct-8678484214096':
    '/uploads/2123_mesa_de_exterior_pequena_Zz_Stcng_S_45a01728dc.pdf',
  'shopifyProduct-8678484312400':
    '/uploads/2122_mesa_de_exterior_grande_s_Hj_I_Qz_Zz_54ba486b90.pdf',
  'shopifyProduct-8678484377936': '/uploads/2074_banco_sem_costas_BLIF_Wp1_C_42c1e4d42a.pdf',
  'shopifyProduct-8678484476240': '/uploads/2010_banco_sem_costas_lj_S21_Lay_ccef3417b1.pdf',
  'shopifyProduct-8678484509008': '/uploads/2020_banco_de_merenda_sem_encosto_36c0772eb4.pdf',
  'shopifyProduct-8678484574544': '/uploads/2035_banco_de_jardim_urbano_Pqsgqt5s_962ea8ceea.pdf',
  'shopifyProduct-8678484607312': '/uploads/2037_banco_rustico_2_GU_Nf_Rt4_27d38c33a2.pdf',
  'shopifyProduct-8678484672848':
    '/uploads/2038_banco_ripado_de_merenda_stc_QF_0_CK_2e27384b67.pdf',
  'shopifyProduct-8678484738384':
    '/uploads/2040_banco_de_merenda_simples_mdq_W_Noab_e3288092e8.pdf',
  'shopifyProduct-8678484803920': '/uploads/2055_banco_arvore_MJ_4_FGU_4_T_6e0c44dc78.pdf',
  'shopifyProduct-8678484902224': '/uploads/2080_mesa_de_esplanada_deck_G4_Gq_Re_Dx_0951e98f6d.pdf',
  'shopifyProduct-8063224316193': '/uploads/2092_mesa_exterior_6_pessoas_1_af1392c9d3.pdf',
  'shopifyProduct-8063224348961': '/uploads/2100_mesa_exterior_8_pessoas_cd7ea566ed.pdf',
  'shopifyProduct-8678484934992':
    '/uploads/2102_mesa_octogonal_com_bancos_C_Wz_Trl_Sb_6765d39c1b.pdf',
  'shopifyProduct-8678485000528':
    '/uploads/2113_mesa_de_exterior_com_bancos_EU_0rlc_MH_e3261ba0c7.pdf',
  'shopifyProduct-8678485066064':
    '/uploads/2110_mesa_com_bancos_em_meios_troncos_al_E_Tm94v_4aa468cf1f.pdf',
  'shopifyProduct-8678485131600': '/uploads/2450_suporte_de_bicicletas_zn_Bv_HD_6_B_f09cc55228.pdf',
  'shopifyProduct-8678485197136': '/uploads/2180_papeleira_w04j4_C2_S_381288fe6f.pdf',
  'shopifyProduct-8678485229904': '/uploads/2181_papeleira_com_tampa_d_HIIWL_3u_f8cf5f0214.pdf',
  'shopifyProduct-8678485295440':
    '/uploads/2185_caixote_com_recipiente_de_plastico_Ps_BXQ_Nlk_a64e288c8d.pdf',
  'shopifyProduct-8678485328208': '/uploads/2186_caixote_de_lixo_x_O_Gk_Xhmb_ca2e6553c5.pdf',
  'shopifyProduct-8661037089104': '/uploads/2200_sinalizacao_dupla_t_Npda_Xo_R_5b47f40188.pdf',
  'shopifyProduct-8678485459280': '/uploads/2201_sinalizacao_tripla_j_SQHOP_Fk_c62f87b8b8.pdf',
  'shopifyProduct-8678485492048': '/uploads/2202_sinalizacao_simples_Imik_Bb_BQ_15e82111ae.pdf',
  'shopifyProduct-8678485557584':
    '/uploads/2380_placard_informativo_zona_de_descanso_9_CKH_Puya_559e0e0140.pdf',
  'shopifyProduct-8678485655888': '/uploads/zona_de_estacionamento_FWF_7r_X6q_5bc5827df2.pdf',
  'shopifyProduct-8678485819728': '/uploads/wc_single_3361bf69cc.pdf',
  'shopifyProduct-8678485885264': '/uploads/wc_duplo_2f00a2bc9a.pdf',
  'shopifyProduct-8678485918032': '/uploads/ponte_direita_200x600_9pn_KPL_Oh_e2dee21b2a.pdf',
  'shopifyProduct-8678485983568': '/uploads/2390_placard_informativo_c_Vrod7_NQ_3dea323671.pdf',
  'shopifyProduct-8678486049104': '/uploads/2270_abrigo_em_madeira_4_D1280_SP_441685983a.pdf',
  'shopifyProduct-8678486081872':
    '/uploads/2330_2331_2332_Barraca_para_Jardim_compressed_05412d91df.pdf',
  'shopifyProduct-8678486180176': '/uploads/2340_Barraca_Bar_compressed_ee2e0021f1.pdf',
  'shopifyProduct-8678486245712': '/uploads/ponte_arqueada_200x600_gdd_G9_Oky_0dc6b25547.pdf',
  'shopifyProduct-8678486278480': '/uploads/sinaletica_pequena_S18c_QXJL_d79d46ad92.pdf',
  'shopifyProduct-8678486344016': '/uploads/sinaletica_grande_Acz0_Kg_HE_c38bc4093c.pdf',
  'shopifyProduct-8678486376784': '/uploads/painel_informativo_v7_Nh_D6le_a69f312c9c.pdf',
  'shopifyProduct-8678486475088': '/uploads/sinaletica_simples_pequena_55uqarq_I_20d33bd730.pdf',
  'shopifyProduct-8678486507856': '/uploads/sinaletica_simples_media_u2_U0u_KMG_ad554b87fa.pdf',
  'shopifyProduct-8678486573392': '/uploads/sinaletica_simples_grande_6mda1_O_Hk_ae8a5b2ef6.pdf',
  'shopifyProduct-8678486638928': '/uploads/sinaletica_tripla_8_Awt_Fwa_L_e5dbacbad1.pdf',
  'shopifyProduct-8678486671696': '/uploads/2210_ponte_150m_de_largura_FX_Slyrh_P_84db1fe093.pdf',
  'shopifyProduct-8678486770000': '/uploads/2211_ponte_150m_de_largura_eb_NXYN_2h_bc1929b313.pdf',
  'shopifyProduct-8678486835536': '/uploads/2212_ponte_200m_de_largura_GNP_8_B6_Bj_e57346b5a6.pdf',
  'shopifyProduct-8678486901072': '/uploads/2213_ponte_250m_de_largura_43_I_Ld_VYK_e405c18c77.pdf',
  'shopifyProduct-8678486933840':
    '/uploads/2240_modulos_para_pavimento_em_rodelas_de_pinho_BD_Ilh_M_Zg_74e58c37b4.pdf',
  'shopifyProduct-8507707752784': '/uploads/2245_Estrado_de_praia_f14526a6ce.pdf',
  'shopifyProduct-8063220318497': '/uploads/modulos_deck_82_CR_Sir_A_f9fed63384.pdf',
  'shopifyProduct-8678487032144': '/uploads/2250_Painel_de_protecao_visual_e_sonora_14991cce37.pdf',
  'shopifyProduct-8678487097680': '/uploads/2300_degraus_r_U_Kjp6_QZ_ed8bd89118.pdf',
  'shopifyProduct-8678487163216': '/uploads/2206_2207_bordadura_em_madeira_cd20dcdd01.pdf',
  'shopifyProduct-8678487261520':
    '/uploads/2310_palicada_para_sustentacao_de_terras_e_SP_Yzcii_d8c55451d5.pdf',
  'shopifyProduct-8678487392592': '/uploads/2341_Bar_Quiosque_compressed_0cae7259b6.pdf',
  'shopifyProduct-8678487458128': '/uploads/2360_sanitario_de_campo_w_X_Ixdam_D_2d7ec4a0c4.pdf',
  'shopifyProduct-8678487523664': '/uploads/2140_Pergula_madeira_redonda_1262c7da2b.pdf',
  'shopifyProduct-8678487556432': '/uploads/2345_quiosque_s2_G_Nf_T4w_049c5cee78.pdf',
  'shopifyProduct-8678487654736': '/uploads/2350_torre_de_vigia_6961f8008c.pdf',
  'shopifyProduct-8678487720272': '/uploads/regeneradores_dunares_g024x26d_997c876e93.pdf',
  'shopifyProduct-8678487753040': '/uploads/mulch_Hg_Ru_Ull_K_5b88b62cec.pdf',
  'shopifyProduct-8678487851344': '/uploads/Vedacao_metalica_Prega_5_MM_9007932c0e.pdf',
  'shopifyProduct-8678487884112': '/uploads/Vedacao_metalica_Prega_4_MM_774470f5a1.pdf',
  'shopifyProduct-8678487949648': '/uploads/Fio_Duplo_569b3fe851.pdf',
  'shopifyProduct-8678488015184': '/uploads/Fio_Duplo_Forte_4_10b343cc2d.pdf',
  'shopifyProduct-8678488080720': '/uploads/tutor_quadrado_CWM_0_U1jt_8f6e945fde.pdf',
  'shopifyProduct-8678488146256': '/uploads/tutores_cilindricos_yz_H940_ZY_d1dd21945e.pdf',
  'shopifyProduct-8678488179024':
    '/uploads/placas_de_colmo_tropical_e_normal_tw_Q9_Z0_Wz_0a1e2be914.pdf',
  'shopifyProduct-8017935237409': '/uploads/chapeus_de_sol_com_colmo_Wn98_M_Qe_I_fd2012e89f.pdf',
  'shopifyProduct-8063225528609': '/uploads/mesa_para_chapeu_colmo_p_V_Pu_FM_1d_2c2c709d62.pdf',
  'shopifyProduct-8678488244560': '',
  'shopifyProduct-8500083687760': '/uploads/eco_travessas_bz_Xp9_Bso_b719facc3d.pdf',
  'shopifyProduct-8678488342864':
    '/uploads/observatorio_de_aves_modelo_1_h0_OA_Inl_Z_1d998d4cf9.pdf',
  'shopifyProduct-8678488375632':
    '/uploads/observatorio_de_aves_modelo_2_26_X7_ATNN_c1f39204af.pdf',
  'shopifyProduct-8678488441168':
    '/uploads/observatorio_de_aves_modelo_3_dtt9_Eyd_N_6318437556.pdf',
  'shopifyProduct-8678488539472':
    '/uploads/observatorio_de_aves_modelo_4_y_A_Qt_Jq_Iw_fb85ab6d0d.pdf',
  'shopifyProduct-8678488637776':
    '/uploads/observatorio_de_aves_modelo_5_w_Rbog2o_G_f129808f47.pdf',
  'shopifyProduct-8678488670544': '/uploads/passadico_guarda_tipo_g1_b_H8_WX_5py_f0c968305a.pdf',
  'shopifyProduct-8678488768848': '/uploads/passadico_guarda_tipo_g2_wnw_E_Cmtf_d08244a136.pdf',
  'shopifyProduct-8678488867152': '/uploads/Passadico_guarda_tipo_G3_G4_G5_5cba3f0b94.pdf',
  'shopifyProduct-8063220285729': '/uploads/Pergolas_all_compressed_a017145c14.pdf',
  'shopifyProduct-8678488998224': '/uploads/boxes_exteriores_j_Zi_O_Mzo_G_0773e92ba5.pdf',
  'shopifyProduct-8678489030992': '/uploads/boxes_interiores_design_2_OZQOJGF_c20de46948.pdf',
  'shopifyProduct-8678489096528': '/uploads/boxes_interiores_exclusive_EGB_5yj_Jc_e3af77bf90.pdf',
  'shopifyProduct-8678489162064': '/uploads/boxes_interiores_standard_P5t_Bmqq_A_d08f0062e5.pdf',
  'shopifyProduct-8678489227600': '/uploads/aparas_2_562f40aeb7.pdf',
  'shopifyProduct-8678489293136': '/uploads/naves_tipo_americano_Kvx_Il_Y3_K_24838e5e49.pdf',
  'shopifyProduct-8678489391440':
    '/uploads/piso_de_borracha_para_cavalos_n_IRW_Tzgw_1c9f1a1bb1.pdf',
  'shopifyProduct-8678489456976': '/uploads/pisos_com_fibras_k5_S_Xm_S_Nd_79b444cba1.pdf',
  'shopifyProduct-8678489522512': '/uploads/piso_com_fibras_e_cera_i_F1_K_Er_Jn_0a7793be19.pdf',
  'shopifyProduct-8678489588048': '/uploads/vedacoes_horserail_simples_ngebc_Em_G_8e176c0c6b.pdf',
  'shopifyProduct-8678489620816': '/uploads/guias_eletricas_t_Ke_Yre_O0_9074dd1f23.pdf',
  'shopifyProduct-8678489719120': '/uploads/trackmaster_15m_ti_Tew_Rzj_43af2e4fe1.pdf',
  'shopifyProduct-8678489784656': '/uploads/Rede_Plastificada_Forte_36c3b5ec57.pdf',
  'shopifyProduct-8678489850192': '/uploads/Rede_Plastificada_Luxor_557c90f7da.pdf',
  'shopifyProduct-8678489915728': '/uploads/Rede_Plastificada_Palma_06ea396ea2.pdf',
  'shopifyProduct-8678489981264': '/uploads/Rede_Malha_Elastica_fccb37bda9.pdf',
  'shopifyProduct-8678490014032': '/uploads/Poste_Carmo_Grip_2d68801db9.pdf',
  'shopifyProduct-8678490145104': '/uploads/Vedacao_Vedexpress_a5738d1025.pdf',
  'shopifyProduct-8678490177872': '/uploads/2220_vedacao_texana_b_Uwlppv_O_6c19c23860.pdf',
  'shopifyProduct-8678490243408': '/uploads/2221_vedacao_texana_plus_i_AIQ_Fh_UY_3f685dafbf.pdf',
  'shopifyProduct-8678490308944': '/uploads/2230_vedacao_rustic_n_G_Wwf1_Lg_01f1de55b6.pdf',
  'shopifyProduct-8678490440016': '/uploads/2231_Vedacao_com_uniao_metalicas_8c01aac834.pdf',
  'shopifyProduct-8678490472784':
    '/uploads/carpool_vedacoes_e_portoes_de_madeira_FWV_7diwc_9435e65b6b.pdf',
  'shopifyProduct-8678490538320': '/uploads/portao_park_3_WROY_Wt_O_7789120097.pdf',
  'shopifyProduct-8678490702160': '/uploads/Vedacao_e_cancela_park_20221012_3bf6c535a4.pdf',
  'shopifyProduct-8678490800464': '/uploads/portao_square_vv8mj_ZG_2_6261e12128.pdf',
  'shopifyProduct-8678490833232': '/uploads/portao_piquet_8mvoq4_De_d35264f55b.pdf',
  'shopifyProduct-8678490898768': '/uploads/cancela_inglesa_31_ua_Dvn_C0_O_5079cfe61c.pdf',
  'shopifyProduct-8678490997072': '/uploads/cancela_inglesa_30_3_Nt_JBNYO_ed04e221dd.pdf',
  'shopifyProduct-8678491062608': '',
  'shopifyProduct-8678491160912':
    '/uploads/rails_de_protecao_em_madeira_e_metal_277_Yci_JO_c1f204e5b2.pdf',
  'shopifyProduct-8678491226448':
    '/uploads/rails_de_protecao_em_madeira_Z_Qh_L_Nlki_4c81efc0cb.pdf',
  'shopifyProduct-8678491324752':
    '/uploads/barreiras_acusticas_silent_wood_d_F_Kffmf_P_67e482371e.pdf',
  'shopifyProduct-8678491357520': '/uploads/fenox_amarras_standard_M4_I_En_Oou_f79edd63c0.pdf',
  'shopifyProduct-8678491423056': '',
  'shopifyProduct-8678491488592': '/uploads/postes_carmet_1_1470ce982f.pdf',
  'shopifyProduct-8678491586896': '/uploads/fenox_alargador_37x_Qt2b_X_8757213b7e.pdf',
  'shopifyProduct-8678491619664':
    '/uploads/fenox_alargadores_de_alta_resistencia_Zup_Bx_Ik_R_8cf195ddc5.pdf',
  'shopifyProduct-8678491717968': '/uploads/fenox_placas_de_instalacao_EF_Uf_Kz_Qt_b543ff0976.pdf',
  'shopifyProduct-8678491783504': '/uploads/fenox_acessorio_para_amarra_Evu2_PJVP_18e9fbaef0.pdf',
  'shopifyProduct-8678491816272': '/uploads/fenox_mandril_bg68kwe_U_7809c9d493.pdf',
  'shopifyProduct-8678491914576': '/uploads/fenox_helice_com_tirante_7o_RD_5e_Yd_f6c4924529.pdf',
  'shopifyProduct-8678491980112':
    '/uploads/fenox_chave_de_colocacao_do_disco_w7_Q_Rqc_Nt_4fd605f5ea.pdf',
  'shopifyProduct-8678492012880':
    '/uploads/fenox_amarras_em_espiral_recuperaveis_j3v_Sk7z_H_1c3bbc2d15.pdf',
  'shopifyProduct-8678492078416':
    '/uploads/fenox_amarras_em_espiral_conica_Rth_Tm6mg_8e5ec96ab7.pdf',
  'shopifyProduct-8678492176720': '/uploads/arame_klasse_carmo_Gw_P0z_K89_4141bc3b3a.pdf',
  'shopifyProduct-8678492307792': '/uploads/arame_crapal_Ogh7c4_CO_d651b9fa2e.pdf',
  'shopifyProduct-8678492340560': '/uploads/arame_farpado_908b9aea55.pdf',
  'shopifyProduct-8678492406096': '/uploads/vedacoes_agricolas_gama_flex_jb9dd_Kig_64bd15e624.pdf',
  'shopifyProduct-8678492504400': '/uploads/vedacoes_agricolas_gama_fk_jdgng_SMO_10f45ac796.pdf',
  'shopifyProduct-8678492569936':
    '/uploads/fenox_correntes_de_aco_em_inox_oyp_Zl_VLV_03a6f68a8c.pdf',
  'shopifyProduct-8678492635472': '/uploads/portao_agricola_metalico_X8tz9s_RV_3ef5b9d962.pdf',
  'shopifyProduct-8678492701008': '/uploads/grampos_barbelados_PT_273be4c103.pdf',
  'shopifyProduct-8678492766544': '/uploads/grampo_croche_mi_BVB_Xi_M_b66ee45fe4.pdf',
  'shopifyProduct-8678492832080': '/uploads/helices_sl_R9_VK_Bq_62dbc15228.pdf',
  'shopifyProduct-8678492864848':
    '/uploads/tirantes_acessorios_agricolas_Q0s_JO_Mm_B_18d61a6018.pdf',
  'shopifyProduct-8678492995920': '/uploads/fio_polyester_ftr_GF_Ei_W_0ae0709da5.pdf',
  'shopifyProduct-8678493061456': '',
  'shopifyProduct-8678493159760': '/uploads/gripple_ancora_Nq_Oc_H_Rcy_7f907bfb32.pdf',
  'shopifyProduct-8678493225296': '/uploads/gripple_g_pack_Cg_Uz_Ngg_C_5d2bf82ec5.pdf',
  'shopifyProduct-8678493290832': '/uploads/gripple_vit_s_c3f_VJB_15_8e7c20eb9c.pdf',
  'shopifyProduct-8678493356368': '/uploads/gripple_alicate_NN_4_Mnn_F1_ddd7e8ba80.pdf',
  'shopifyProduct-8678493487440': '/uploads/gripple_gp_no_1_no_2_Xu_Ekiqq_M_c83cf15f9f.pdf',
  'shopifyProduct-8678493618512': '/uploads/fenox_esticador_0h_No_S_Kqi_8107720604.pdf',
  'shopifyProduct-8678493716816': '/uploads/fenox_forquilhas_B_Eenw6_WH_fbd5f0d6b3.pdf',
  'shopifyProduct-8678493782352':
    '/uploads/fenox_extensores_para_arames_moveis_Qk_Fy_Y_Xn1_a5bdc5404c.pdf',
  'shopifyProduct-8678493880656': '/uploads/fenox_parafusos_poste_madeira_CG_Rnbv6a_38b7b22cb6.pdf',
  'shopifyProduct-8678494011728': '/uploads/fenox_parafusos_poste_metal_s1_E_Acf9d_59b73361f9.pdf',
  'shopifyProduct-8678494142800':
    '/uploads/fenox_extensor_universal_misto_Khgo_Kzh_S_4717a191d1.pdf',
  'shopifyProduct-8678494241104': '/uploads/fenox_grampo_arpao_500_un_Qn0_E9u_Kg_de5ec30adf.pdf',
  'shopifyProduct-8678494437712': '/uploads/fenox_clip_aluminio_Lie4k_Bk_A_e353423eec.pdf',
  'shopifyProduct-8678494536016': '/uploads/clips_biodegradaveis_753c69eb39.pdf',
  'shopifyProduct-8678494568784': '/uploads/fenox_alicate_multifuncoes_vv_EM_3_O_Lv_5c18cdf168.pdf',
  'shopifyProduct-8678494699856': '',
  'shopifyProduct-8678494830928': '/uploads/fenox_ligador_de_arames_Mcy72_Wua_ed0bffabf9.pdf',
  'shopifyProduct-8678494994768':
    '/uploads/fenox_separador_universal_tsaro_josu_Uh98_d5e4b585d1.pdf',
  'shopifyProduct-8678495027536': '/uploads/fenox_grampo_barbelado_odj1_Dx_Z3_18b17e6936.pdf',
  'shopifyProduct-8678495125840': '/uploads/fenox_tutor_e_plantador_T_Ibsg_O2_O_a6ed13b7d7.pdf',
  'shopifyProduct-8678495224144': '/uploads/fenox_tutor_metalico_Ly_Xlj_UYU_4614235866.pdf',
  'shopifyProduct-8678495322448':
    '/uploads/fenox_atador_reutilizavel_de_aco_inox_Bo5b_Ga7_J_cafb7fe46c.pdf',
  'shopifyProduct-8678495453520':
    '/uploads/fenox_clip_para_rede_fio_unico_B_Rf5k9_FC_c8bfd8956e.pdf',
  'shopifyProduct-8678495519056': '',
  'shopifyProduct-8678495584592': '/uploads/postes_conicos_tratados_1ukp9ksh_734526ec19.pdf',
  'shopifyProduct-8678495682896':
    '/uploads/postes_telefonicos_e_linhas_aereas_2g_HGZT_12_5238f7715c.pdf',
  'shopifyProduct-8063220449569': '/uploads/postes_torneados_tratado_DGJ_Oy_TVJ_cbde2a3c36.pdf',
  'shopifyProduct-8063220384033':
    '/uploads/madeira_serrada_pinho_pirineus_tratada_yw_VA_8in_Y_b4ce2c068c.pdf',
  'shopifyProduct-8499956646224':
    '/uploads/madeira_serrada_pinho_nacional_tratada_ripas_de_telhado_l_Zz2_D5_R1_b5684dbae9.pdf',
  'shopifyProduct-8678495879504':
    '/uploads/madeira_serrada_pinho_pirineus_sem_tratamento_b_ENYY_8_Zf_49f06cbd5d.pdf',
  'shopifyProduct-8678496141648': '/uploads/Madeira_Lamelado_colado_tratado_2d308d6c24.pdf',
  'shopifyProduct-8063220154657': '/uploads/Madeira_Deck_CARMO_cb4ff3cf50.pdf',
  'shopifyProduct-8118506783009': '/uploads/Madeira_Deck_Termo_Modificado_d4ab1d491c.pdf',
  'shopifyProduct-8678496436560':
    '/uploads/madeira_lamelada_colada_nao_tratada_27s_Z4_Phz_86bae7d793.pdf',
  'shopifyProduct-8678496731472': '/uploads/Forro_Pinho_Tratado_compressed_71647a484a.pdf',
  'shopifyProduct-8678497059152': '/uploads/Forro_pinho_termo_modificado_compressed_5724d6bfc8.pdf',
  'shopifyProduct-8678497354064': '/uploads/Madeira_soalho_pinho_nordico_aa0270f95c.pdf',
  'shopifyProduct-8678497517904': '/uploads/2196_painel_de_sombreamento_hc9_Rp_VLQ_74f011b731.pdf',
  'shopifyProduct-8678497845584': '/uploads/postes_lingueta_574f4bc2fd.pdf',
  'shopifyProduct-8678498009424': '/uploads/postes_cabeceira_a345efd167.pdf',
  'shopifyProduct-8678498140496': '/uploads/post_punch_bate_estacas_300c_a4a7_Rjw_C_912b920f01.pdf',
  'shopifyProduct-8197992284449': '/uploads/espreguicadeira_relax_Jw6_K1_Z_Dg_f8a32e1fd2.pdf',
  'shopifyProduct-8678498206032':
    '/uploads/2182_papeleira_tratada_em_castanho_PDAV_1m_YM_2e84f654a4.pdf',
  'shopifyProduct-8678498304336':
    '/uploads/2188_caixote_de_lixo_tratamento_em_castanho_P6l_Xs_Av4_aca316b4e4.pdf',
  'shopifyProduct-8017932878113': '/uploads/Madeira_Deck_CARMO_FILANDIA_631c979d91.pdf',
  'shopifyProduct-8063220220193': '/uploads/Madeira_Deck_CARMO_SUECIA_79ded4ebb1.pdf',
  'shopifyProduct-8678498500944': '/uploads/Madeira_Deck_CARMO_LISO_37b4a66016.pdf',
  'shopifyProduct-8499372753232':
    '/uploads/madeira_serrada_pinho_silvestre_tratada_hw_T_Mz_Na_Z_bf8760e9b8.pdf',
  'shopifyProduct-8678498632016':
    '/uploads/madeira_serrada_pinho_silvestre_sem_tratamento_X_Vhcb_Ao_W_901220a0c8.pdf',
  'shopifyProduct-8678498697552': '/uploads/5010_palanque_de_caca_ec_Eu_Twnu_54772ee0c3.pdf',
  'shopifyProduct-8678498763088': '',
  'shopifyProduct-8678498894160': '',
  'shopifyProduct-8678498926928': '',
  'shopifyProduct-8678499025232':
    '/uploads/5014_palanque_de_caca_simples_o_Xa_K_Xa_Pu_adb4771d43.pdf',
  'shopifyProduct-8678499090768':
    '/uploads/madeira_serrada_pinho_nacional_tratada_solho_Rjoyw_N8_J_677a791f58.pdf',
  'shopifyProduct-8678499156304':
    '/uploads/madeira_serrada_pinho_nacional_tratada_costaneiras_k_PY_Fw_C3_O_f469daad69.pdf',
  'shopifyProduct-8678499254608':
    '/uploads/Mesa_de_refeicao_Sudexpress_2_00m_Pes_T_compressed_78fb3de71a.pdf',
  'shopifyProduct-8678499320144': '/uploads/2055_C_2056_Banco_2_00_compressed_58fa8cae6c.pdf',
  'shopifyProduct-8527131967824':
    '/uploads/Mesa_de_refeicao_Sudexpress_2_00m_Pes_T_compressed_feb1c0cfc1.pdf',
  'shopifyProduct-8197992448289': '/uploads/2539_sofa_relax_2_lugares_Yh_Du_O_Lk_H_66f3a3ef08.pdf',
  'shopifyProduct-8197992317217': '/uploads/2538_sofa_relax_4_lugares_7kya_DP_Ma_1723d04491.pdf',
  'shopifyProduct-8556488884560': '/uploads/2537_extensao_sofa_relax_2_KH_Qzicj_f7490c2ac2.pdf',
  'shopifyProduct-8678499418448':
    '/uploads/2533_modulo_sofa_relax_2_lugares_u_TG_Fznqz_2536c61483.pdf',
  'shopifyProduct-8678499451216':
    '/uploads/2535_modulo_sofa_relax_3_lugares_p_Zk5_Ll3h_97e1e4579a.pdf',
  'shopifyProduct-8678499483984':
    '/uploads/2534_modulo_sofa_relax_4_lugares_80_Nmq7_JQ_e23cf52736.pdf',
  'shopifyProduct-8063225004321': '',
  'shopifyProduct-8578671739216': '/uploads/2536_modulo_mesa_relax_w_W_Efw_M9a_feb1cb6025.pdf',
  'shopifyProduct-8063225299233':
    '/uploads/2542_mesa_relax_circular_tampo_madeira_k_Fy4njp4_f158492104.pdf',
  'shopifyProduct-8063224480033':
    '/uploads/2524_mesa_relax_rectangular_tampo_madeira_WM_0_Ekl2_U_8d377dd5f2.pdf',
  'shopifyProduct-8063225266465': '/uploads/2541_mesa_centro_relax_4l_Cju_T_Qh_8aabfb68c0.pdf',
  'shopifyProduct-8063225332001':
    '/uploads/2543_mesa_relax_apoio_quadrada_5_U_Kh0ft_B_02dbd48a2b.pdf',
  'shopifyProduct-8678499582288': '/uploads/2171_horta_urbana_Q_Cq6tqsm_4d9a572a29.pdf',
  'shopifyProduct-8678499713360': '/uploads/Fichas_Medieval_1800_b8ebe86cfd.pdf',
  'shopifyProduct-8678499811664': '/uploads/Fichas_Medieval_1801_2a6cfc914b.pdf',
  'shopifyProduct-8678499942736': '/uploads/Fichas_Medieval_1802_a36a06c474.pdf',
  'shopifyProduct-8678500008272': '/uploads/Fichas_Medieval_1803_401c518935.pdf',
  'shopifyProduct-8678500073808': '/uploads/Fichas_Medieval_1804_19a6ed8ac0.pdf',
  'shopifyProduct-8197992743201': '/uploads/2545_C_2545_Cadeirao_SUD_compressed_fe5263c5ee.pdf',
  'shopifyProduct-8197992841505': '/uploads/2546_C_2546_Sofa3pax_SUD_compressed_6977e14185.pdf',
  'shopifyProduct-8197992907041': '/uploads/2547_C_2547_EXTENSAO_SUD_compressed_3867497514.pdf',
  'shopifyProduct-8063225135393':
    '/uploads/2548_2548_C_Mesa_de_centro_Sudexpress_compressed_392b7d9d79.pdf',
  'shopifyProduct-8598133670224':
    '/uploads/2549_C_2549_Side_Table_Grande_SUD_compressed_c24250bd33.pdf',
  'shopifyProduct-8598142353744':
    '/uploads/2550_C_2550_Side_Table_Peq_SUD_compressed_0e300e178b.pdf',
  'shopifyProduct-8678500237648': '/uploads/2545_C_2545_Cadeirao_SUD_compressed_fe5263c5ee.pdf',
  'shopifyProduct-8559911338320': '/uploads/2546_C_2546_Sofa3pax_SUD_compressed_6977e14185.pdf',
  'shopifyProduct-8559912255824': '/uploads/2547_C_2547_EXTENSAO_SUD_compressed_3867497514.pdf',
  'shopifyProduct-8678500335952':
    '/uploads/2548_2548_C_Mesa_de_centro_Sudexpress_compressed_0a9e9fc82f.pdf',
  'shopifyProduct-8678500434256': '/uploads/2355_suporte_de_pranchas_l_O7_Sc2sh_c41a6e6c1a.pdf',
  'shopifyProduct-8678500532560': '/uploads/2356_suporte_de_fatos_0_G335y_Ni_446598f6c2.pdf',
  'shopifyProduct-8678500598096': '/uploads/2357_cuba_lavagem_7_NR_Vff_Kq_cc3821f8c2.pdf',
  'shopifyProduct-8678500729168': '/uploads/bordillo_cfvy_Wa_Ud_7e39bd3b47.pdf',
  'shopifyProduct-8678500893008': '',
  'shopifyProduct-8678501089616': '',
  'shopifyProduct-8678501155152': '',
  'shopifyProduct-8678501286224': '',
  'shopifyProduct-8678501351760': '',
  'shopifyProduct-8678501482832': '',
  'shopifyProduct-8678501581136': '',
  'shopifyProduct-8678501613904': '',
  'shopifyProduct-8678501712208': '',
  'shopifyProduct-8678501810512': '',
  'shopifyProduct-8678501974352': '',
  'shopifyProduct-8678502039888': '',
  'shopifyProduct-8678502105424': '',
  'shopifyProduct-8678502203728': '',
  'shopifyProduct-8678502302032': '',
  'shopifyProduct-8678502334800': '',
  'shopifyProduct-8678502400336': '',
  'shopifyProduct-8678502498640': '',
  'shopifyProduct-8678502629712': '',
  'shopifyProduct-8678502760784': '',
  'shopifyProduct-8678502891856': '',
  'shopifyProduct-8678502957392': '',
  'shopifyProduct-8678502990160': '',
  'shopifyProduct-8678503121232': '',
  'shopifyProduct-8678503154000': '',
  'shopifyProduct-8678503219536': '/uploads/2433_abrigo_horta_urbana_2_95fce4f649.pdf',
  'shopifyProduct-8678503285072': '/uploads/Camping_Decks_38c51e1fb1.pdf',
  'shopifyProduct-8678503317840': '/uploads/Pergulas_de_camping_decks_380ca06fed.pdf',
  'shopifyProduct-8678503383376': '',
  'shopifyProduct-8678503448912': '',
  'shopifyProduct-8678503481680': '/uploads/post_punch_bate_estacas_250c_7j_At0k_KE_2ceb3c94fe.pdf',
  'shopifyProduct-8678503514448': '',
  'shopifyProduct-8678503547216': '/uploads/mesa_com_toldo_Vux_IUY_1p_ae7013baef.pdf',
  'shopifyProduct-8063225397537':
    '/uploads/Mesa_de_refeicao_Sudexpress_2_80m_Pes_X_compressed_d64d47dd11.pdf',
  'shopifyProduct-8063224250657': '/uploads/casota_cao_grande_n5_G9_Lcr_A_8b4688648b.pdf',
  'shopifyProduct-8063224283425': '/uploads/casota_cao_pequena_Sxfg_Q7aj_f79f3513da.pdf',
  'shopifyProduct-8634754498896': '',
  'shopifyProduct-8550463734096':
    '/uploads/2052_CX_2052_X_Banco_2_80_PES_X_compressed_3e00473b50.pdf',
  'shopifyProduct-8063224873249':
    '/uploads/2054_C_2054_X_Banco_Pequeno_Pes_X_compressed_343f780158.pdf',
  'shopifyProduct-8492841304400':
    '/uploads/Mesa_de_refeicao_Sudexpress_2_80m_Pes_X_compressed_d75f813308.pdf',
  'shopifyProduct-8498144936272':
    '/uploads/2054_C_2054_X_Banco_Pequeno_Pes_X_compressed_8327266352.pdf',
  'shopifyProduct-8501730476368': '/uploads/secretaria_grande_y_NC_7u6m_T_6911573c18.pdf',
  'shopifyProduct-8501534490960': '/uploads/secretaria_r_Okmi_NEG_0a7e35840f.pdf',
  'shopifyProduct-8501738078544': '/uploads/estante_grande_Mw8_TC_4_GO_6579f9cabd.pdf',
  'shopifyProduct-8501732507984': '/uploads/estante_b5cyqyhx_907f27b234.pdf',
  'shopifyProduct-8501739880784': '/uploads/mesa_reunioes_redonda_y_WQXBF_Sz_87054dc215.pdf',
  'shopifyProduct-8678503645520': '/uploads/Fichas_Medieval_1805_02a78ccb46.pdf',
  'shopifyProduct-8678503678288': '/uploads/Fichas_Medieval_1806_43ab8a5b86.pdf',
  'shopifyProduct-8678503711056': '/uploads/sofa_individual_xl_relax_9_K_Nb_H8w8_06cce489f3.pdf',
  'shopifyProduct-8678503776592': '/uploads/sofa_2_lugares_xl_relax_2_Je5_H9g_I_bf25c10f4b.pdf',
  'shopifyProduct-8678503842128': '/uploads/2352_torre_de_vigia_BALNEAR_6cdcb6494c.pdf',
  'shopifyProduct-8063224021281': '/uploads/Tulipa_PT_18a0deebc7.pdf',
  'shopifyProduct-8063224054049': '/uploads/Orquidea_PT_32757ab574.pdf',
  'shopifyProduct-8063224086817': '/uploads/Lavanda_PT_cdf8961c5a.pdf',
  'shopifyProduct-8063224119585': '/uploads/Margarida_PT_0672729271.pdf',
  'shopifyProduct-8063224185121': '/uploads/Jasmim_PT_335b4f9c08.pdf',
  'shopifyProduct-8063224217889': '/uploads/Girassol_PT_d1d4e62b77.pdf',
  'shopifyProduct-8678503874896': '/uploads/2512_Cxl_Sofa3lugares_d03e5fd63b.pdf',
  'shopifyProduct-8678503940432': '/uploads/sofa_4_lugares_xl_relax_o_G_Uw_Lnge_48d3a99eac.pdf',
  'shopifyProduct-8063224152353': '/uploads/Violeta_PT_0a882d2629.pdf',
  'shopifyProduct-8678504005968': '',
  'shopifyProduct-8678504038736': '',
  'shopifyProduct-8678504137040': '',
  'shopifyProduct-8678504202576': '',
  'shopifyProduct-8678504268112': '',
  'shopifyProduct-8678504366416': '',
  'shopifyProduct-8678504464720': '',
  'shopifyProduct-8678504530256': '',
  'shopifyProduct-8678504595792': '',
  'shopifyProduct-8678504628560': '',
  'shopifyProduct-8678504694096': '',
  'shopifyProduct-8678504759632': '',
  'shopifyProduct-8678504825168': '',
  'shopifyProduct-8678504857936': '',
  'shopifyProduct-8501750038864': '/uploads/modulo_secretaria_Oe_Eoas_GS_fc5989a02b.pdf',
  'shopifyProduct-8567787618640':
    '/uploads/2581_2581_C_Cadeira_com_bracos_Sudexpress_compressed_876f0541f6.pdf',
  'shopifyProduct-8678504989008':
    '/uploads/2582_2582_C_Cadeira_sem_bracos_Sudexpress_compressed_3071bd378e.pdf',
  'shopifyProduct-8678505021776': '/uploads/tunel_m_F_Pz_F6gy_f8ecbbc7ca.pdf',
  'shopifyProduct-8678505054544': '/uploads/lomba_e64_AZ_Aa6_aeb7078973.pdf',
  'shopifyProduct-8678505152848': '/uploads/passadeira_de_precisao_Z_Gc8yvsa_b164dcf410.pdf',
  'shopifyProduct-8678505185616': '/uploads/zig_zag_u40_Env14_7acb4eb6ec.pdf',
  'shopifyProduct-8678505218384': '/uploads/spring_TA_Gg_P1_Nq_3d76650ee5.pdf',
  'shopifyProduct-8678505251152': '/uploads/salto_altura_Tn_Cwvvtp_66bf433264.pdf',
  'shopifyProduct-8678505316688': '/uploads/salto_precisao_o_QMQB_3k_F_33d7d70bbb.pdf',
  'shopifyProduct-8678505382224': '/uploads/salto_progressivo_i_N_Ecz_J3z_b2c14cf14a.pdf',
  'shopifyProduct-8678505414992': '/uploads/salto_moldura_6_Q_Dr0_ND_5_07f394c504.pdf',
  'shopifyProduct-8678505447760': '/uploads/salto_classico_9xu_TL_Oh_M_aaec9b995e.pdf',
  'shopifyProduct-8678505513296': '/uploads/slalom_z5n8d_Ggc_6f6be39696.pdf',
  'shopifyProduct-8678505578832': '/uploads/jogo_de_estacas_3bbu_CMIE_906a4c3eb5.pdf',
  'shopifyProduct-8678505611600': '/uploads/montanha_Eh_WD_8_Ya_E_977ef32985.pdf',
  'shopifyProduct-8678505709904': '/uploads/plataforma_relax_x_A_Hr6d_KQ_33ee083d5f.pdf',
  'shopifyProduct-8678505775440': '/uploads/plataforma_dupla_yg_Jp_T9t_Z_c0225ccc7c.pdf',
  'shopifyProduct-8678505808208': '/uploads/park_Jc_P_Ku_Km_L_62a79a1657.pdf',
  'shopifyProduct-8678505873744': '/uploads/rampa_fv12_Foii_cc9bdfa372.pdf',
  'shopifyProduct-8678506037584': '',
  'shopifyProduct-8678506070352': '/uploads/solho_4jj1ym_Lq_133c19da6a.pdf',
  'shopifyProduct-8678506103120':
    '/uploads/modulo_sofa_2_lugares_xl_relax_Di6_R6_Ay1_999ef4af4f.pdf',
  'shopifyProduct-8678506168656':
    '/uploads/modulo_sofa_3_lugares_xl_relax_844tt_KH_3_319760f289.pdf',
  'shopifyProduct-8678506234192':
    '/uploads/modulo_sofa_4_lugares_xl_relax_3r_HT_Ldvw_c9059a783b.pdf',
  'shopifyProduct-8634529317200': '/uploads/modulo_mesa_xl_relax_b_Cih_Uh6o_c343609485.pdf',
  'shopifyProduct-8634602127696':
    '/uploads/2580_2580_C_Mesa_de_apoio_pequena_Sudexpress_compressed_2c79799956.pdf',
  'shopifyProduct-8678506266960':
    '/uploads/2580_2580_C_Mesa_de_apoio_pequena_Sudexpress_compressed_2c79799956.pdf',
  'shopifyProduct-8063225594145': '/uploads/2602_2604_Cadeira_COM_bracos_compressed_5b32359602.pdf',
  'shopifyProduct-8678506332496': '',
  'shopifyProduct-8678506398032': '/uploads/Forro_de_Abeto_compressed_6381c93814.pdf',
  'shopifyProduct-8678506430800':
    '/uploads/bebedouro_com_adaptador_canino_samt_CM_Vo_b2ff0f85e5.pdf',
  'shopifyProduct-8678506496336': '/uploads/2189_Papeleira_com_tampa_dispensador_e187e57ba0.pdf',
  'shopifyProduct-8678506529104': '/uploads/1506_Mola_Cavalo_0cf434c38d.pdf',
  'shopifyProduct-8678506594640': '/uploads/1510_Mola_Foca_a92153f49d.pdf',
  'shopifyProduct-8678506627408': '/uploads/1508_Mola_Mota_9ef8dc20c2.pdf',
  'shopifyProduct-8063225725217': '/uploads/2600_Cadeirao_Sunset_1pax_compressed_50dc3a3312.pdf',
  'shopifyProduct-8063225856289':
    '/uploads/2606_2606_B_Mesa_Retangular_Sunset_compressed_97c32e177b.pdf',
  'shopifyProduct-8197993169185':
    '/uploads/2605_2605_B_Espreguicadeira_sunset_compressed_900f8b0577.pdf',
  'shopifyProduct-8501746925904': '/uploads/Mesa_reuniao_grande_2_152ab0a6fb.pdf',
  'shopifyProduct-8678506692944': '/uploads/picadeiro_portico_f_Lx_Bi_ZYA_a7d83b2697.pdf',
  'shopifyProduct-8678506758480': '',
  'shopifyProduct-8678506856784': '/uploads/1365_Torre_escalada_40797bbcd4.pdf',
  'shopifyProduct-8678506889552': '/uploads/3311_caixa_botija_ca730a2e3b.pdf',
  'shopifyProduct-8678506922320': '/uploads/Portao_de_painel_de_abrir_328e4c6915.pdf',
  'shopifyProduct-8678507020624': '/uploads/Portao_de_painel_de_correr_c50bd3ebf9.pdf',
  'shopifyProduct-8063225790753': '/uploads/2607_Sofa_1_PAX_sunset_compressed_f13e269141.pdf',
  'shopifyProduct-8063225823521': '/uploads/2608_SUNSET_sofa_3_pax_c6cfb0d78c.pdf',
  'shopifyProduct-8678507053392': '/uploads/2257_Painel_de_eucalipto_compressed_d7075cee6a.pdf',
  'shopifyProduct-8678507086160': '',
  'shopifyProduct-8678507184464': '',
  'shopifyProduct-8678507250000': '',
  'shopifyProduct-8678507282768': '',
  'shopifyProduct-8678507381072': '',
  'shopifyProduct-8678507479376': '',
  'shopifyProduct-8678507512144': '',
  'shopifyProduct-8678507544912': '',
  'shopifyProduct-8678507610448': '',
  'shopifyProduct-8678507708752': '',
  'shopifyProduct-8678507741520': '/uploads/2565_Estacao_de_Bracos_compressed_8d9c6930e3.pdf',
  'shopifyProduct-8678507807056': '/uploads/2572_Circuito_de_Equilibrio_compressed_433980d8f8.pdf',
  'shopifyProduct-8678507872592': '',
  'shopifyProduct-8678507905360': '',
  'shopifyProduct-8678507970896': '',
  'shopifyProduct-8678508036432': '',
  'shopifyProduct-8678508069200': '',
  'shopifyProduct-8678508134736': '',
  'shopifyProduct-8678508200272': '',
  'shopifyProduct-8678508265808': '',
  'shopifyProduct-8678508364112': '',
  'shopifyProduct-8678508396880': '',
  'shopifyProduct-8678508462416': '',
  'shopifyProduct-8678508527952': '',
  'shopifyProduct-8506857947472': '/uploads/7002_Horta_Vertical_PT_e042d4b5a7.pdf',
  'shopifyProduct-8506853458256': '/uploads/7001_Horta_Socalcos_PT_e17ecf7d79.pdf',
  'shopifyProduct-8507676492112': '/uploads/7003_Horta_Mesa_de_Cultivo_PT_e3aecd26a9.pdf',
  'shopifyProduct-8678508560720': '',
  'shopifyProduct-8678508691792': '/uploads/Postes_seguranca_perimetro_ba0e4623c3.pdf',
  'shopifyProduct-8678508724560': '/uploads/separador_aitor_d7fff69e25.pdf',
  'shopifyProduct-8678508822864': '',
  'shopifyProduct-8678508888400': '',
  'shopifyProduct-8063225561377': '/uploads/2601_2603_Cadeira_sem_bracos_compressed_8d4350dcc8.pdf',
  'shopifyProduct-8678508953936': '',
  'shopifyProduct-8063220416801': '',
  'shopifyProduct-8678508986704': '',
  'shopifyProduct-8678509019472': '',
  'shopifyProduct-8063220547873': '',
  'shopifyProduct-8063225987361': '/uploads/2609_daybed_sunset_5433bb7705.pdf',
  'shopifyProduct-8634650853712': '/uploads/2057_Banco_Duplo_Sud_compressed_9ff9798482.pdf',
  'shopifyProduct-8550458130768':
    '/uploads/2052_CX_2052_X_Banco_2_80_PES_X_compressed_e87b01d90d.pdf',
  'shopifyProduct-8063225364769': '/uploads/2055_C_2056_Banco_2_00_compressed_2c1329e7b0.pdf',
  'shopifyProduct-8634548126032':
    '/uploads/2141_C_Mesa_de_refeicao_Quadrada_compressed_fa26c88f63.pdf',
  'shopifyProduct-8634647150928': '/uploads/2613_C_Banco_Individual_Sud_compressed_a6a75e3ca6.pdf',
  'shopifyProduct-8598840541520': '/uploads/2515_Espreguicadeira_Diagonal_59abbdaaca.pdf',
  'shopifyProduct-8678509117776': '',
  'shopifyProduct-8197990482209': '',
  'shopifyProduct-8197990187297': '',
  'shopifyProduct-8134704365857': '',
  'shopifyProduct-8197989368097': '',
  'shopifyProduct-8197991170337': '',
  'shopifyProduct-8197988974881': '',
  'shopifyProduct-8197990678817': '',
  'shopifyProduct-8678509150544': '',
  'shopifyProduct-8197990973729': '',
  'shopifyProduct-8197989728545': '',
  'shopifyProduct-8197990023457': '',
  'shopifyProduct-8197989957921': '',
  'shopifyProduct-8197989859617': '',
  'shopifyProduct-8197991268641': '',
  'shopifyProduct-8678509183312':
    '/uploads/2581_2581_C_Cadeira_com_bracos_Sudexpress_compressed_7a6f649f13.pdf',
  'shopifyProduct-8634557825360':
    '/uploads/2582_2582_C_Cadeira_sem_bracos_Sudexpress_compressed_20e98728fb.pdf',
  'shopifyProduct-8506778452304': '/uploads/Revestimento_Ripado_16_MM_1_6b6df9c78c.pdf',
  'shopifyProduct-8506778386768': '/uploads/Revestimento_Ripado_24_MM_1_caca2136b8.pdf',
  'shopifyProduct-8506778354000': '/uploads/Revestimento_Ripado_35_MM_ac260a623f.pdf',
  'shopifyProduct-8678509314384': '',
  'shopifyProduct-8498186682704': '/uploads/2054_C_2054_Banco_Pequeno_compressed_c5eaf36633.pdf',
  'shopifyProduct-8499030950224': '/uploads/2052_C_2052_Banco_2_80_compressed_a85198dbcb.pdf',
  'shopifyProduct-8527299936592':
    '/uploads/Mesa_de_refeicao_Sudexpress_2_00m_Pes_X_compressed_24e7148f54.pdf',
  'shopifyProduct-8527398830416':
    '/uploads/2056_CX_2056_X_Banco_2_00_PES_X_compressed_31a7bd4c3b.pdf',
  'shopifyProduct-8527482552656':
    '/uploads/Mesa_de_refeicao_Sudexpress_2_00m_Pes_X_compressed_c09114df81.pdf',
  'shopifyProduct-8527496544592':
    '/uploads/2056_CX_2056_X_Banco_2_00_PES_X_compressed_a249657637.pdf',
  'shopifyProduct-8566570615120': '/uploads/Chat_Cabine_compressed_b1436198bd.pdf',
  'shopifyProduct-8566571532624': '/uploads/Chat_Cabine_Dupla_compressed_4be959415e.pdf',
  'shopifyProduct-8565533278544': '/uploads/Modulo_Gavetas_compressed_a8db0b0077.pdf',
  'shopifyProduct-8565531705680': '/uploads/Modulo_Gavetas_compressed_880ac0bad6.pdf',
  'shopifyProduct-8678509379920': '',
  'shopifyProduct-8678509412688': '',
  'shopifyProduct-8678509445456': '',
  'shopifyProduct-8678509543760': '',
  'shopifyProduct-8678509576528': '',
  'shopifyProduct-8678509642064': '',
  'shopifyProduct-8678509707600': '',
  'shopifyProduct-8678509740368': '',
  'shopifyProduct-8678509805904': '',
  'shopifyProduct-8678509871440': '',
  'shopifyProduct-8678509904208': '/uploads/2564_Barra_de_Elevacao_compressed_e7f997e051.pdf',
  'shopifyProduct-8634697810256': '/uploads/2612_Cadeirao_Sunset_2pax_compressed_07b187dce8.pdf',
}

// Input and output file paths
const inputFilePath = 'input.ndjson'
const outputFilePath = 'output.ndjson'

// The key to append to each line
const keyToAdd = 'newKey'

// Read the input NDJSON file and append the key to each line
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const lines = data.trim().split('\n')
  const modifiedLines = lines.map((line) => {
    const jsonObject = JSON.parse(line)
    /*if (technicalSheets[jsonObject._id]) {
      jsonObject.technicalSheet = {
        _type: 'file',
        _sanityAsset: `file@https://admin.carmo.com${technicalSheets[jsonObject._id]}`,
      }
    } else {
      delete jsonObject.technicalSheet
    }*/
    if (jsonObject.language == 'fr') {
      jsonObject.categories[0]._ref = 'noticias'
    }

    return JSON.stringify(jsonObject)
  })

  const modifiedNDJSON = modifiedLines.join('\n')

  // Write the modified NDJSON to the output file
  fs.writeFile(outputFilePath, modifiedNDJSON, 'utf8', (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Successfully wrote the modified NDJSON to ${outputFilePath}`)
    }
  })
})
