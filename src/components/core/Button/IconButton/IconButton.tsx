import { Button } from "@mui/material";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface IconButtonProps {
  Icon: React.ElementType;
  title: string;
  onClick?: any;
  className?: string;
  loading?: boolean;
}
const IconButton = ({ loading, Icon, title, onClick, className }: IconButtonProps) => {
  return (
    <>
      {loading ? (
        <LoadingButton size="small" loading={loading} variant="outlined" disabled>
          <span>disabled</span>
        </LoadingButton>
      ) : (
        <Button disabled={loading} className={className} variant="outlined" startIcon={<Icon />} onClick={onClick}>
          {title}
        </Button>
      )}
    </>
  );
};

export default IconButton;
