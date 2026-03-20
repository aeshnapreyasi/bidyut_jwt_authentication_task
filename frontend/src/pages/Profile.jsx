import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={8}>
                    <Card className="shadow-sm text-center">
                        <Card.Header as="h4" className="bg-primary text-white">Dashboard</Card.Header>
                        <Card.Body className="py-5">
                            {user ? (
                                <>
                                    <Card.Title className="mb-4">Welcome back!</Card.Title>
                                    <Card.Text className="text-muted mb-2">
                                        <strong>Email:</strong> {user.email}
                                    </Card.Text>
                                    <Card.Text className="text-muted">
                                        <strong>Account ID:</strong> #{user.id}
                                    </Card.Text>
                                </>
                            ) : (
                                <Spinner animation="border" variant="primary" />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;