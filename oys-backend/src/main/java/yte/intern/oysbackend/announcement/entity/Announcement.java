package yte.intern.oysbackend.announcement.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yte.intern.oysbackend.common.entity.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Lob;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Announcement extends BaseEntity {

    private String title;

    @Lob
    private String announcement;

    private LocalDateTime postDateTime;

}
