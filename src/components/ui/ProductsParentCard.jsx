const ProductsParentCard = (props) => {
  const classes =
    "flex flex-wrap justify-center md:justify-start gap-4 " + props.className;

  return <div className={classes}>{props.children}</div>;
};

export default ProductsParentCard;
