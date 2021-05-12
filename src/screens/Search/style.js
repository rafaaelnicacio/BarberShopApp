import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1px;
    background-color: #63c2d1;
    padding: 20px;
`;
export const SearchArea = styled.View`
    background-color: #4eadbe;
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
`;
export const Scroller = styled.ScrollView`
    flex: 1;
`;
export const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #ffffff;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;
export const ListArea = styled.View`
    margin-top: 30px;
    margin-bottom: 30px;
    padding-right: 6px;
`;




