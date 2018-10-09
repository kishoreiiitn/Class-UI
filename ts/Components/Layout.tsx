import * as React from "react";
import { css, cx, styled } from "../Emotion";
import { IBaseComponentProps } from "./Base";

export interface IProps extends IBaseComponentProps {
	basis?: number | string;
	column?: boolean;
	wrap?: boolean;
	justify?:
		| "center"
		| "flex-start"
		| "flex-end"
		| "space-between"
		| "space-around";
	align?: "center" | "flex-start" | "flex-end" | "stretch";
	gutter?: number;
	margin?: number;
	spread?: boolean;
	remain?: boolean;
	className?: string;

	// Common Child Properties.
	children?: any;
}

export class Layout extends React.Component<IProps> {
	public static defaultProps: IProps = {
		align: "center",
		basis: "auto",
		column: false,
		gutter: 0,
		justify: "center",
		margin: 0,
		spread: false,
		wrap: false
	};

	render() {
		const cls = cx(
			css`
			display: flex;
			flex-direction: ${this.props.column ? `column` : `row`};
			flex-wrap: ${this.props.wrap ? `wrap` : `nowrap`};
			${
				this.props.column
					? `height: ${this.props.basis};`
					: `width: ${this.props.basis};`
			}
			justify-content: ${this.props.justify};
			align-items: ${this.props.align};
			${
				this.props.remain
					? `
				flex-grow: 1;
			`
					: undefined
			}

			${
				this.props.spread
					? `
			& > * {
				flex: 1 1 auto;
			}`
					: undefined
			}
		`,
			this.props.className
		);
		const count = React.Children.count(this.props.children);
		const children = React.Children.map(
			this.props.children,
			(elem: any, i) => {
				if (!elem || (elem.type !== Section && elem.type !== Layout)) {
					console.error("Unknown type child passed.");
					return;
				}

				const style: React.CSSProperties = {};
				if (this.props.column) {
					style.width = "100%";
					style.marginTop =
						i === 0 ? this.props.margin : this.props.gutter;
				} else {
					style.marginLeft =
						i === 0 ? this.props.margin : this.props.gutter;
				}
				if (i === count - 1) {
					if (this.props.column) {
						style.marginBottom = this.props.margin;
					} else {
						style.marginRight = this.props.margin;
					}
				}
				return React.cloneElement(elem, {
					...elem.props,
					style: {
						...style,
						...elem.props.style
					}
				});
			}
		);
		return <div className={cls}>{children}</div>;
	}
}

const ESection = styled("div")``;
export interface ISectionProps extends IBaseComponentProps {
	basis?: number | string;
	children?: any;
	remain?: boolean;
}

/**
 * Section is an extendable ClassUI Component.
 */
export let Section = (props: ISectionProps) => {
	return (
		<ESection
			className={cx(
				css`
					flex-basis: ${props.basis}px;
					${props.remain
						? `flex-grow: 1;flex-shrink: 1;`
						: undefined};
				`,
				props.className
			)}
		>
			{props.children}
		</ESection>
	);
};
