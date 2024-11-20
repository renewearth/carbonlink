import React from "react";
import { Modal, Box, IconButton, Divider, SxProps, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface CarbonlinkModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode; // Allow any React node for the title
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Custom styles for the modal container
  headerSx?: SxProps<Theme>; // Custom styles for the header
  footer?: React.ReactNode; // Optional footer content
}

export const CarbonlinkModal: React.FC<CarbonlinkModalProps> = ({
  open,
  onClose,
  title,
  children,
  sx,
  headerSx,
  footer,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          minWidth: "400px",
          maxWidth: "800px",
          width: "100%",
          ...sx,
        }}
      >
        {/* Header Section */}
        {title && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              pb: 2,
              mb: 2,
              ...headerSx,
            }}
          >
            {title}
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* Content Section */}
        <Box sx={{ mb: footer ? 2 : 0 }}>{children}</Box>

        {/* Footer Section */}
        {footer && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ textAlign: "right" }}>{footer}</Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CarbonlinkModal;
