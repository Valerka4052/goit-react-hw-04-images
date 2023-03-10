import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { Header, Form, Button, ButtonLabel, Field } from './Searchbar.styled';

import { ReactComponent as SearchIcon } from "../../icons/search.svg";

export function SearchBar ({onSearch}) {

   const getValue = (initialValues) => {
        const search = initialValues.searchQuerry.trim();
            onSearch(search);
    };

const validationSchema = Yup.object({
            searchQuerry: Yup.string(),
});
      return (
          <Header>
              <Formik
                  initialValues={{ searchQuerry: '' }}
                  onSubmit={(value) => getValue(value)}
                  validationSchema={validationSchema}
              >
                  <Form>
                      <Button type="submit">
                          <SearchIcon width={20} height={20} />
                          <ButtonLabel ></ButtonLabel>
                      </Button>
                      <Field
                          name="searchQuerry"
                          type="text"
                          autoComplete="off"
                          autoFocus
                          placeholder="Search images and photos" />
                  </Form>
              </Formik>
          </Header>
      );
    };

    SearchBar.propTypes = {
        onSearch: PropTypes.func.isRequired,
    };