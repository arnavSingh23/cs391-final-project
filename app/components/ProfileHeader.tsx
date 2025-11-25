"use client";
import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, TextField, Button, CardContent, Card } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import type { User } from "../../types";

interface ProfileHeaderProps {
    user: User;
    onUpdateUser: (u: User) => void;
}

export default function ProfileHeader({ user, onUpdateUser }: ProfileHeaderProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User>(user);

    useEffect(() => {
        if (!isEditing) setEditedUser(user);
    }, [user, isEditing]);

    const handleSave = () => {
        onUpdateUser(editedUser);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    const formatDate = (date?: Date) =>
        date ? date.toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "";

    return (
        <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                    <Box sx={{ display: "flex", gap: 3, flex: 1 }}>
                        <Avatar src={editedUser.avatar} alt={editedUser.name} sx={{ width: 96, height: 96 }}>
                            {editedUser.name?.charAt(0)}
                        </Avatar>

                        <Box sx={{ flex: 1 }}>
                            {isEditing ? (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        size="small"
                                        value={editedUser.name}
                                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        size="small"
                                        type="email"
                                        value={editedUser.email}
                                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                    />
                                </Box>
                            ) : (
                                <>
                                    <Typography variant="h4" sx={{ mb: 1 }}>
                                        {user.name}
                                    </Typography>

                                    <Box sx={{ display: "flex", gap: 2, color: "text.secondary" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                            <MailOutlineIcon sx={{ fontSize: 16 }} />
                                            <Typography variant="body2">{user.email}</Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                            <CalendarMonthIcon sx={{ fontSize: 16 }} />
                                            <Typography variant="body2">Joined {formatDate(user.joinedDate)}</Typography>
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        {isEditing ? (
                            <>
                                <Button variant="contained" size="small" startIcon={<SaveIcon />} onClick={handleSave}>
                                    Save
                                </Button>
                                <Button variant="outlined" size="small" startIcon={<CloseIcon />} onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </Button>
                        )}
                    </Box>
                </Box>

                <CardContent sx={{ pt: 0, px: 0, pb: 0 }}>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Bio"
                            value={editedUser.bio}
                            onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                        />
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            {user.bio}
                        </Typography>
                    )}
                </CardContent>
            </CardContent>
        </Card>
    );
}
