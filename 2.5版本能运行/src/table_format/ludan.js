let tableFormat = {
	X100122: function (that) {

		return [ // 雇主责任险
			{
				title: "订单编号",
				key: "order_no",
				align: "center",
				minWidth: 155,
				show: true,
				check: true
			},
			{
				title: "保单号",
				key: "policy_no",
				align: "center",
				minWidth: 170,
				show: true,
				check: true,
				render: (h, params) => {
					//let that = this;
					let update = that.authorityData.update;
					let order = params.row;
					if (order.policy_no) {
						return h(
							"Button",
							{
								props: {
									type: "text",
									size: "small",
									disabled: !update
								},
								style: {
									display: (order.policy_no != null) ? "none" : "inline-block",
									color: update ? '' : '#b1b1b1',
								},
								on: {
									click: () => {
										that.writePolicy(order);
									}
								}
							},
							"填写保单号"
						)
					} else {
						return h(
							"div",
							{
								props: {}
							},
							order.policy_no
						);
					}
				}
			},
			{
				title: "方案",
				key: "scheme_name",
				align: "center",
				minWidth: 65,
				show: true,
				  check: true
			},
			{
				title: "保险公司",
				key: "ic_name",
				align: "center",
				minWidth: 65,
				show: true,
				  check: true
			},
			{
				title: "被保人",
				key: "recog_name",
				align: "center",
				minWidth: 140,
				show: true,
				  check: true
			},
			{
				title: "保费（￥）",
				key: "need_pay_price",
				align: "center",
				minWidth: 80,
				show: true,
				  check: true
			},
			{
				title: "净费（￥）",
				key: "agreement_premiun",
				align: "center",
				minWidth: 70,
				show: true,
				  check: true
			},
			{
				title: "渠道商价格（￥）",
				key: "insure_channel_price",
				align: "center",
				minWidth: 70,
				show: true,
				  check: true,
				render: (h, params) => {
					//let that = this;
					let endorsement = params.row;
					let texts = endorsement.insure_channel_price;
					if (texts) { // 状态为空
						texts = 0;
					}
					if (endorsement.additional_parameter != null && endorsement.additional_parameter != undefined) {
						let parameter = endorsement.additional_parameter.split(',');
						return h(
							"Tooltip",
							{
								props: {
									content: '账号价格：' + parameter[1] + '　保险公司价格：' + parameter[0] + '　渠道价格：' + parameter[4],
									placement: 'top'
								},
								style: {
									color: '#19be6b',
									display: 'inline-block',
									backgroundColor: 'rgba(25, 190, 107,.05)',
									border: '1px solid rgba(25, 190, 107,.1)',
									borderRadius: '3px',
									cursor: 'pointer',
									padding: '3px 8px !important'
								}
							},
							texts
						);
					} else {
						return h(
							"div",
							{
								props: {},
								style: {
									color: '#19be6b',
								}
							},
							texts
						);
					}
				}
			},
			{
				title: "人数",
				key: "counts",
				align: "center",
				minWidth: 50,
				show: true,
				  check: true
			},
			{
				title: "出单类型",
				key: "issuing_type",
				align: "center",
				minWidth: 65,
				show: true,
				  check: true,
				render: (h, params) => {
					//let that = this;
					let order = params.row;
					let issuing_type = order.issuing_type;

					let state_key = "issuing_type_" + issuing_type;
					let texts = that.dataRansition[state_key];
					return h(
						"div",
						{
							props: {}
						},
						texts
					);
				}
			},
			{
				title: "下单用户",
				key: "user_name",
				align: "center",
				minWidth: 80,
				show: true,
				  check: true
			},
			{
				title: "下单时间",
				key: "ctime",
				align: "center",
				minWidth: 80,
				show: true,
				  check: true
			},
			{
				title: "状态",
				key: "state",
				align: "center",
				minWidth: 80,
				show: true,
				  check: true,
				render: (h, params) => {
					//let that = this;
					let order = params.row;
					let state = order.state;
					let audit_state = order.audit_state;
					let e_state = order.e_state;
					let voucher_audit_state = order.voucher_audit_state;

					let state_key = "state_" + state;
					let state_key2 = "";
					let color_key = "";
					let color_key2 = "";
					let texts = '';
					let texts2 = '';
					let isState2 = true;

					if (state == '03') { // 已出单
						state_key2 = "voucher_audit_state_" + voucher_audit_state;
					} else if (state == '09' || state == '10') { // 过期|退保
						isState2 = false;
					} else {
						if (audit_state != '01' && state == '02') {
							state_key = "audit_state_" + audit_state;
							state_key2 = "e_state_" + e_state;
						} else {

							if (audit_state == '01') {
								state_key = "audit_state_01";
								state_key2 = "voucher_audit_state_" + voucher_audit_state;
							} else {
								state_key2 = "audit_state_" + audit_state;
							}
						}
					}
					let values = that.dataRansition[state_key].split(',');
					texts = values[0];
					color_key = values[1];
					let value1 = that.dataRansition[state_key2];
					if (value1) {
						let values2 = that.dataRansition[state_key2].split(',');
						texts2 = values2[0];
						color_key2 = values2[1];
					}
					let overdue = order.overdue;
					if (overdue == '00') {
						isState2 = true;
					}

					return h("div", [
						h("div", {
							props: {},
							style: {
								color: color_key
							}
						}, texts),
						h("Badge", {
							props: {
								count: overdue == '00' ? '逾期' : 0
							},
							style: {
								display: isState2 ? 'inline-block' : 'none',
								color: color_key2
							}
						}, texts2)

					]);
				}
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				minWidth: 200,
				show: true,
				  check: false,
				render: (h, params) => {
					//let that = this;
          console.log(params)
					let order = params.row;
					order.upload_file_type = 'policy';
					let state = order.state;
					let e_state = order.e_state;
					let isUpload = false;
					let upload_text = '上传保单';
					let authorityData = that.authorityData;
					let sendEmail = false;
					if (state == '02') {
						sendEmail = authorityData.email;
					}
					if (state == '03') {
						isUpload = that.authorityData.upload;
						if (isUpload && !order.policy_url) {
							upload_text = '重新上传';
						}
					}
					let email_text = '发送邮件';
					if (e_state == '05') {
						email_text = '重发邮件';
					}
					return h("a", [
						h(
							"Button",
							{
								props: {
									type: "text",
									size: "small",
									disabled: that.authorityData.detail     // ture
								},
								style: {
									marginRight: "5px",
									color: !that.authorityData.detail ? '' : '#b1b1b1'
								},
								on: {
									click: () => {
									  // alert(that.authorityData.detail)
									  console.log('放开了');
									  console.log(order)
										that.orderDetail(order);
									}
								}
							},
							"查看"
						),
						h(
							"Button",
							{
								props: {
									type: "text",
									size: "small",
									disabled: !sendEmail
								},
								style: {
									marginRight: "5px",
									color: sendEmail ? '' : '#b1b1b1'
								},
								on: {
									click: () => {
										let recog_name = '雇主责任险投保单 - ' + order.recog_name;
										that.emailModalTitle = recog_name;
										that.emailModalFlag = true;
										that.sendEmailForm.email_theme = recog_name;
										that.sendEmailForm.order_id = order.order_id;
										that.sendEmailForm.policyNo = order.policy_no;
										that.sendEmailForm.appliName = order.appli_name;
										that.sendEmailForm.recogName = order.recog_name;
										//that.$Message.info('发送邮件功能暂未开通！');
									}
								}
							},
							email_text
						),
						h("Button", {
							props: {
								type: "text",
								size: "small"
							}
						},
							[
								h("Upload",
									{
										props: {
											action: 'http://106.14.114.45:8080/api/resource/aliUploadEmployer.action',
											ref: "upload",
											data: order,
											//accept:'application/pdf',
											beforeUpload: () => {
												//console.log(this);
												that.handleBeforeUpload();
											},
											onSuccess: (res) => {
												//that.$Message.success('上传成功');
												//console.log(res);
												//console.log(file);
												that.handleSuccess(res);
											},
											onError: () => {
												//console.log(res);
												//console.log(file);
												//that.$Message.error('上传失败');
												that.handleError();
											}
										},
										style: {
											marginRight: "5px",
											display: isUpload ? "" : "none",
											padding: '7px 0',
                      border: 0
										}

									},
									upload_text
								),
								h("Button", {
									props: {
										type: "text",
										size: "small",
										disabled: !isUpload
									},
									style: {
										display: isUpload ? "none" : "",
										color: isUpload ? '' : '#b1b1b1',
										padding: 0,
									},
                  class: {
                    'show':true
                  }
								},
									isUpload ? '' : '上传保单'
								)
							])
					]);
				}
			}
		];
	}
}



export default tableFormat;
