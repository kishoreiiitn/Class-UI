import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

export interface IProps {
	width?: number|string,
	inline?: boolean,
	direction?: "row" | "column",
	wrap?: boolean,
	justify?: "center" | "start" | "end" | "space-between" | "space-around",
	align?: "center" | "start" | "end" | "stretch",
	gutter?: number,
	margin?: number,
	equalWidth?: boolean,
	medianomatch?: IProps
};
export interface IState {};

export class Layout extends React.Component<IProps, IState> {

	public static defaultProps:IProps = {
		width: 'auto',
		inline: false,
		direction: "row",
		wrap: false,
		justify: "center",
		align: "center",
		gutter: 0,
		margin: 0,
		equalWidth: false
	};

	render() {
		let cls = classNames("flexbox",
			"justify-"+this.props.justify,
			"align-"+this.props.align,
			{
				"eq-width": this.props.equalWidth,
				"column": this.props.direction=="column",
				"wrap": this.props.wrap
			}
		);
		let count = React.Children.count(this.props.children);
		let children = React.Children.map(this.props.children, (elem: React.ReactElement<any>, i)=>{
			let style: React.CSSProperties = {};
			if (this.props.direction=="column"){
				style.marginTop = (i==0)?this.props.margin:this.props.gutter;
			}
			else{
				style.marginLeft = (i==0)?this.props.margin: this.props.gutter;
			}
			if (i==count-1) {
				if (this.props.direction=="column")
					style.marginBottom = this.props.margin;
				else
					style.marginRight = this.props.margin;
			}
			return React.cloneElement(elem, {
				style: {
					...elem.props.style,
					...style
				}
			});
		});
		return <div style={{
			maxWidth: this.props.width
		}} className={cls} >
			{
				children
			}
		</div>;
	}
}

export interface SectionIProps {
	style?: React.CSSProperties,
	width?: number|string,
	children?: any,
	card?: boolean
};

export let Section = (props: SectionIProps)=>{
	let cls = classNames({
		"card-1": props.card
	});
	return <div className={cls} style={{
		flexBasis: props.width,
		...props.style
	}}>
		{props.children}
	</div>;
};