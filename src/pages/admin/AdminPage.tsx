import simpleRestProvider from 'ra-data-simple-rest';
import { Admin, Resource, List, Datagrid, TopToolbar, ListButton, BooleanField, Button, LongTextInput, NumberField, NumberInput, UrlField, DateField, ReferenceInput, TextField,ReferenceField, Toolbar, ImageInput, EmailField, EditButton, DeleteButton,SelectInput, ImageField, Create, SimpleForm, TextInput, Edit, BooleanInput, DateInput } from 'react-admin';

const dataProvider = simpleRestProvider('http://localhost:5555');

export const SeekerList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="firstName" />
            <TextField source="lastName" />
            <EmailField source="email" />
            <TextField source="phoneNumber" />
            <TextField source="telegram" />
            <TextField source="city" />
            <TextField source="birthday" />
            <TextField source="gender" />
            <TextField source="militaryExperience" />
            <TextField source="militaryWork" />
            <ImageField source="image" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const SeekerEdit = (props) => (
    <Edit {...props} redirect="list">
        <SimpleForm>
            <TextInput source="firstName" fullWidth/>
            <TextInput source="lastName" fullWidth/>
            <TextInput source="email" fullWidth/>
            <TextInput source="phoneNumber" fullWidth/>
            <TextInput source="city" fullWidth/>
            <DateInput source="birthday" />
            <SelectInput source="gender" choices={[
                { id: 'male', name: 'Male' },
                { id: 'female', name: 'Female' },
            ]} />
            <BooleanInput source="militaryExperience" />
            <BooleanInput source="militaryWork" />
        </SimpleForm>
    </Edit>
);

export const CompanyList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phoneNumber" />
            <TextField source="telegram" />
            <ImageField source="image" />
            <TextField source="city" />
            <EditButton basePath="/company" />
            <DeleteButton basePath="/company" />
        </Datagrid>
    </List>
);

export const CompanyEdit = (props) => (
    <Edit {...props} redirect="list">
        <SimpleForm>
            <TextInput source="name" fullWidth/>
            <TextInput source="email" fullWidth/>
            <TextInput source="phoneNumber" fullWidth/>
            <TextInput source="telegram" fullWidth/>
            <TextInput source="city" fullWidth/>
            <TextInput source="description" multiline fullWidth/>
            <DeleteButton undoable={false} />
        </SimpleForm>
    </Edit>
);

export const EmployerList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="firstName"/>
            <TextField source="lastName" />
            <TextField source="email" />
            <TextField source="phoneNumber" />
            <TextField source="position" />
            <TextField source="approved" />
            <ReferenceField label="Company" source="company.id" reference="company">
                <TextField source="name" />
            </ReferenceField>
            <EditButton basePath="/employer" />
            <DeleteButton basePath="/employer" />
        </Datagrid>
    </List>
);

export const EmployerEdit = (props) => (
    <Edit {...props} redirect="list">
        <SimpleForm>
            <TextInput source="firstName" fullWidth/>
            <TextInput source="lastName" fullWidth/>
            <TextInput source="email" fullWidth/>
            <TextInput source="phoneNumber" fullWidth/>
            <TextInput source="position" fullWidth/>
            <BooleanInput source="approved" />
        </SimpleForm>
    </Edit>
);

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton basePath="/job-category" />
            <DeleteButton basePath="/job-category" />
        </Datagrid>
    </List>
);

export const CategoryEdit = (props) => (
    <Edit {...props} redirect="list">
        <SimpleForm>
            <TextInput source="name" fullWidth/>
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create {...props} redirect="list">
        <SimpleForm>
            <TextInput source="name" fullWidth/>
        </SimpleForm>
    </Create>
);

const CVList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="education" />
            <TextField source="experience" />
            <TextField source="skills" />
            <ReferenceField label="Seeker" source="seeker.id" reference="seeker">
                <TextField source="firstName" />
            </ReferenceField>
            <ReferenceField label="Category" source="category.id" reference="job-category">
                <TextField source="name" />
            </ReferenceField>
            <UrlField source="cvLink" target="_blank" />
            <DateField source="postingDate" />
            <EditButton basePath="/cv" />
            <DeleteButton basePath="/cv" />
        </Datagrid>
    </List>
);


const CVEdit = (props) => (
    <Edit {...props} redirect="list">
        <SimpleForm>
            <TextInput source="name" fullWidth/>
            <TextInput source="education" multiline fullWidth/>
            <TextInput source="experience" multiline fullWidth/>
            <TextInput source="skills" multiline fullWidth/>
            <ReferenceInput label="Category" source="category.id" reference="job-category">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

const JobOfferList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <NumberField source="salary" />
            <TextField source="city" />
            <ReferenceField label="Category" source="category.id" reference="job-category">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Company" source="company.id" reference="company">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="description" />
            <TextField source="duties" />
            <TextField source="requirements" />
            <TextField source="conditions" />
            <DateField source="postingDate" />
            <EditButton basePath="/job-offer" />
            <DeleteButton basePath="/job-offer" />
        </Datagrid>
    </List>
);

const JobOfferEdit = (props) => (
    <Edit {...props} redirect="list">
        <SimpleForm>
            <TextInput source="name" fullWidth/>
            <NumberInput source="salary" fullWidth/>
            <TextInput source="city" fullWidth/>
            <ReferenceInput label="Category" source="category.id" reference="job-category">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Company" source="company.id" reference="company">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="description" multiline fullWidth/>
            <TextInput source="duties" multiline fullWidth/>
            <TextInput source="requirements" multiline fullWidth/>
            <TextInput source="conditions" multiline fullWidth/>
        </SimpleForm>
    </Edit>
);

const JobRequestList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="text" />
            <TextField source="status" />
            <DateField source="postingDate" />
            <ReferenceField label="Seeker" source="seeker.id" reference="seeker">
                <TextField source="firstName" />
            </ReferenceField>
            <ReferenceField label="JobOffer" source="jobOffer.id" reference="job-offer">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="CV" source="cv.id" reference="cv">
                <TextField source="name" />
            </ReferenceField>
            <EditButton basePath="/job-request" />
            <DeleteButton basePath="/job-request" />
        </Datagrid>
    </List>
);

const JobRequestEdit = (props) => (
    <Edit {...props} redirect="list">
        <SimpleForm>
            <TextInput source="text" multiline fullWidth/>
            <BooleanInput source="status" />
            <ReferenceInput label="JobOffer" source="jobOffer.id" reference="job-offer">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const AdminList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <EmailField source="email" />
            <EditButton basePath="/admin" />
            <DeleteButton basePath="/admin" />
        </Datagrid>
    </List>
);

export const AdminEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="email" fullWidth/>
        </SimpleForm>
    </Edit>
);

const AdminPage = () => (
    <Admin basename="/admin" dataProvider={dataProvider}>
        <Resource name="seeker" list={SeekerList} edit={SeekerEdit}/>
        <Resource name="company" list={CompanyList} edit={CompanyEdit}/>
        <Resource name="employer" list={EmployerList} edit={EmployerEdit}/>
        <Resource name="job-category" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />
        <Resource name="cv" list={CVList} edit={CVEdit}/>
        <Resource name="job-offer" list={JobOfferList} edit={JobOfferEdit}/>
        <Resource name="job-request" list={JobRequestList} edit={JobRequestEdit}/>
        <Resource name="admin" list={AdminList} edit={AdminEdit}/>
    </Admin>
);
export default AdminPage;
