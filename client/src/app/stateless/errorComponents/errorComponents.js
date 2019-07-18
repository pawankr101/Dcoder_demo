import React from 'react';

export function ErrorMsgUnderInputBox(props) {
	if(props.errorText) {
	  return (
		<div className="col-12 text-danger error-msg">
		  {props.errorText}
		</div>
	  );
	}
	return null;
}