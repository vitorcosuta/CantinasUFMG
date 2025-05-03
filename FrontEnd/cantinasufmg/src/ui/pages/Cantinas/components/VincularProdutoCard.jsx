import React from 'react';
import { Box, Typography, Checkbox, TextField } from '@mui/material';

export const VincularProdutoCard = ({
    produto,
    isSelected,
    toggleProduto,
    preco,
    setPreco,
}) => {
    const handleToggle = () => {
        toggleProduto(produto.id);
    };

    const handlePrecoChange = (e) => {
        const value = e.target.value;
        setPreco(produto.id, value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                borderBottom: '1px solid #eee',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexBasis: isSelected ? '50%' : '100%',
                    minWidth: 0,
                }}
            >
                <Checkbox
                    checked={isSelected}
                    onChange={handleToggle}
                    color="primary"
                    sx={{ mr: 0.5 }}
                />
                <Typography
                    variant="body1"
                    fontWeight="500"
                    noWrap
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {produto.nome}
                </Typography>
            </Box>

            {isSelected && (
                <Box
                    sx={{
                        flexBasis: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <TextField
                        size="small"
                        label="Preço (R$)"
                        value={preco || ''}
                        onChange={handlePrecoChange}
                        type="number"
                        inputProps={{
                            min: 0,
                            step: 0.01,
                            style: {
                                MozAppearance: 'textfield',
                            },
                        }}
                        sx={{
                            width: 105,
                            '& input[type=number]::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                            },
                            '& input[type=number]::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};
